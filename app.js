const fs = require('fs')
const path = require('path')
const pdf = require("html-pdf")

module.exports = {
  async htmpPdf(req, res) {
    try {
      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm"
        },
        footer: {
          height: "20mm",
        },
      }

      const data = await ejs.renderFile(path.join(__dirname, "../../views/", "report.ejs"), // ejs file location and file name
        {
          links: modifiedBackLinks, // Data taht pass to ejs file
        }, { async: true })

      pdf.create(data, options).toFile("report.pdf", async (err, data) => {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          console.log(data)
          res.send("File created successfully")
          const dataLocation = await aws.uploadFile("report.pdf") // aws s3 file upload
          console.log(dataLocation) // return s3 bucket location
          const monthName = moment().format("MMMM")
          const project = await Project.findOne({ _id: id }).select("id clientEmail name")
            .populate("_client", "name")

          if (project.clientEmail !== undefined) { // for mailing the s3 file data location
            mail("client-sendreport", {
              to: project.clientEmail,
              subject: `Project Report for ${monthName}`,
              locals: {
                userName: project._client.name.first,
                email: project.clientEmail,
                url: dataLocation,
                project: project.name,
                month: monthName
              }
            })
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
