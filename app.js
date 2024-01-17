const fs = require('fs')
const path = require('path')
const puppeteer = require("puppeteer") // New Method with Puppeteer


module.exports = {
  async htmpPdf(req, res) {
    try {
      const compile = async function () {
        const data = await ejs.renderFile(path.join(__dirname, "../../views/", "report.ejs"), {
          month: moment().format("MMMM"), links: modifiedBackLinks, keyWords: modifiedKeyWord, blogs: blogArr, socialMedias: modifiedsocialMediaReport, daReport: report.daReport, daDate: moment(report.daDate).format("MMM DD, YYYY"), paReport: report.paReport, paDate: moment(report.paDate).format("MMM DD, YYYY"), ssReport: report.ssReport, ssDate: moment(report.ssDate).format("MMM DD, YYYY"), notes: report.notes
        }, { async: true })

        return data
      };

      (async function () {
        try {
          const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser' // Download chromium manually if not work - sudo apt-get install chromium-browser
          });

          const page = await browser.newPage();
          const content = await compile();
          await page.setContent(content)

          await page.pdf({
            path: 'report.pdf',
            format: "A4",
            printBackground: false
          })

          const dataLocation = await aws.uploadFile("report.pdf")
          const monthName = moment().format("MMMM")

          if (project.clientEmail !== undefined) {
            mail("client-sendreport", {
              to: project.clientEmail,
              subject: `Project Report for ${monthName}`,
              locals: {
                userName: project._client.name.first,
                email: project.clientEmail,
                url: dataLocation,
                project: project.name,
                month: monthName
              },
              attachments: mailAttachment
            })
          }
          const path = "./report.pdf"
          fs.unlinkSync(path)
          console.log("File removed:", path)

          await browser.close()
          return res.status(200).json({ error: false, message: "Report Sucessfully Send" })

        } catch (error) {
          console.log("error", error);
        }
      })()

    } catch (error) {
      console.log(error)
    }
  },

  // New Method
  // Install ` wkhtmltopdf ` - sudo apt install wkhtmltopdf
  async htmlPdf2(req, res) {
    try {

    } catch (error) {

    }
  }
}
