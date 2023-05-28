import { Browser, Page } from "puppeteer";
import { extractID } from "./notion/utils/extractID";
import chalk from "chalk";

export const convertTableToJSON = async (
  page: Page,
  browser: Browser,
  urlId: string
) => {
  const data = await page.evaluate(() => {
    const table = document.getElementById("datatable");
    if (table !== null) {
      const rows = table.querySelectorAll("tr");

      const jsonData: any[] = [];
      const headers = Array.from(rows[0].querySelectorAll("th")).map((th) =>
        th.innerText.trim()
      );

      for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const rowData: any = {};
        const cells = Array.from(row.querySelectorAll("td"));

        for (let j = 0; j < cells.length; j++) {
          rowData[headers[j]] = cells[j].innerText;
        }

        jsonData.push(rowData);
      }

      return jsonData;
    }
    return null;
  });

  const getMoreInformation = async (browser: Browser, data: any[] | null) => {
    // Get more information
    if (
      urlId.includes("demandes_devis_specifiques") ||
      urlId.includes("demandes_devis_abandonnees")
    ) {
      if (data) {
        for (const demande of data) {
          try {
            const page = await browser.newPage();

            if (demande["Type"] === "Particulier") {
              await page.goto(
                `https://app.123structure.fr/backoffice/userqcm/show/${demande["ID"]}/part`
              );
            }
            if (demande["Type"] === "Pro") {
              await page.goto(
                `https://app.123structure.fr/backoffice/userqcm/show/${demande["ID"]}/pro`
              );
            }

            const coord = await page.evaluate(() => {
              const cardElement = document.querySelector(
                ".card-body:nth-of-type(1)>p"
              );

              if (cardElement) {
                const content = cardElement.innerHTML;
                const phone = content.split("<br>")[3].trim();
                const email = content.split("<br>")[4].trim();
                return { phone, email };
              } else {
                return null;
              }
            });

            const type = await page.evaluate(() => {
              const projectType = document.getElementById(
                "select2-Q_TYPE_PROJET-container"
              );

              if (projectType) {
                const type = projectType.innerHTML;
                return { projectType: type.trim() };
              } else {
                return null;
              }
            });

            const additionalInformation = await page.evaluate(() => {
              // Select the div with the class "card-body"
              const cardBody = document.querySelector(
                "#layout-wrapper > div.main-content > div > div > div > div:nth-child(2) > div > div"
              );

              if (cardBody !== null) {
                // Select all the <p> tags inside the div
                const paragraphs = cardBody.querySelectorAll("p");

                // Iterate through the <p> tags and find the one containing the specific text
                for (let i = 0; i < paragraphs.length; i++) {
                  if (
                    paragraphs[i].innerHTML.includes(
                      "Informations complémentaires : "
                    )
                  ) {
                    const info = paragraphs[i].innerHTML;
                    return {
                      information: info
                        .trim()
                        .replace("Informations complémentaires : ", ""),
                    };
                  }
                }
              } else {
                return null;
              }
            });

            demande["Téléphone"] = coord?.phone;
            demande["Email"] = coord?.email;
            demande["Type de projet"] = type?.projectType;
            demande["Informations complémentaires"] =
              additionalInformation?.information;

            await page.close();
          } catch (error) {
            console.error(`Navigation failed: ${error}`);
          }
        }
      }
    }
    if (urlId.includes("devis_sauvegardes") || urlId.includes("commandes")) {
      if (data) {
        for (const devis of data) {
          try {
            const page = await browser.newPage();

            if (urlId.includes("devis_sauvegardes")) {
              await page.goto(
                `https://app.123structure.fr/backoffice/quote/${extractID(
                  devis["Numéro"]
                )}/edit`
              );

              const uniqueLink = await page.evaluate(() => {
                const uniqueLinkButton = document.querySelector(
                  "#layout-wrapper > div.main-content > div > div > div.row.qcm > div.col-12.col-md-4 > div > div > a"
                ) as HTMLAnchorElement;
                if (uniqueLinkButton) {
                  const link = uniqueLinkButton.href;
                  return {
                    link,
                  };
                } else {
                  return null;
                }
              });

              devis["Lien unique"] = uniqueLink?.link;
            }

            if (urlId.includes("commandes")) {
              await page.goto(
                `https://app.123structure.fr/backoffice/order/${extractID(
                  devis["Numéro"]
                )}/edit`
              );

              const devisNumber = await page.evaluate(() => {
                const devisNumberInput =
                  document.querySelectorAll<HTMLDivElement>(".listing-entry");
                let devis = "";
                devisNumberInput.forEach((div) => {
                  Array.from(div.children).forEach((child) => {
                    if (child instanceof HTMLElement) {
                      const innerHTML = child.innerHTML;
                      if (innerHTML.includes("Devis :")) {
                        const ID = innerHTML.trim().replace("Devis : ", "");
                        devis = ID;
                      }
                    }
                  });
                });
                if (devis !== "") {
                  return { ID: devis };
                } else {
                  return { ID: "-" };
                }
              });

              const uniqueLink = await page.evaluate(() => {
                const linkList = document.querySelectorAll("a");
                let url = ""
                if (linkList) {
                  linkList.forEach((link: HTMLAnchorElement) => {
                    if (
                      link.href.includes(
                        "https://app.123structure.fr/order/show/"
                      )
                    ) {
                      url = link.href;
                    }
                  });
                  return {
                    link: url,
                  };
                } else {
                  return null;
                }
              });

              devis["Lien unique"] = uniqueLink?.link;
              devis["Devis"] = devisNumber?.ID;
            }
            const phoneNumber = await page.evaluate(() => {
              const phoneNumberInput = document.querySelectorAll("#phone");
              const phoneNumberArray = [] as string[];
              if (phoneNumberInput) {
                phoneNumberInput.forEach((phone) => {
                  const input = phone as HTMLInputElement;
                  phoneNumberArray.push(input.value);
                });
                return {
                  phone: [
                    ...new Set(
                      phoneNumberArray.filter((phone) => phone !== "")
                    ),
                  ],
                };
              } else {
                return null;
              }
            });

            const emailList = await page.evaluate(() => {
              const emailInput = document.querySelectorAll("#email");
              const emailArray = [] as string[];
              if (emailInput) {
                emailInput.forEach((email) => {
                  const input = email as HTMLInputElement;
                  emailArray.push(input.value);
                });
                return {
                  email: [
                    ...new Set(emailArray.filter((email) => email !== "")),
                  ],
                };
              } else {
                return null;
              }
            });

            devis["Téléphone"] = phoneNumber?.phone;
            devis["Email"] = emailList?.email;
          } catch (error) {
            console.error(chalk.bgRed(error));
          }
        }
      }
    }
  };

  // Check if there is at least one row of data
  if (data && data.length > 0) {
    await getMoreInformation(browser, data);
    return data;
  }

  return null;
};
