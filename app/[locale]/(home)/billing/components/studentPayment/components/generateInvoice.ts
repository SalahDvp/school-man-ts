
import { format } from "date-fns";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function downloadInvoice(paymentData:any,id:string,titles:any[],words:any){
    const doc = new jsPDF();
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'school Erp',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
                
            }
          },
          {
            content: words.invoice,
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: `ReferenceID #${id}`
            +`\nDate: ${format(paymentData.paymentDate, 'dd/MM/yyyy')}`,
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {   
            content: words.billedTo
            +`\n${paymentData.parent}`
            +'\nBilling Address line 1'
            +'\nBilling Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
    
            content: words.shippingAddress
            +`\n${paymentData.parent}`
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {        
            content:words.from
            +'\nSchool erp'
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: words.amount,
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: `DZD${paymentData.paymentAmount}`,
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#3366ff'
            }
          }
        ],
        [
          {
            content: `Status: ${paymentData.status}`,
            styles: {
              halign:'right'
            }
          }
        ]
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: "Description",
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });
    const valuesArray:any[] = Object.values(paymentData);
    autoTable(doc, {
      head: [titles],
      body: [
        valuesArray
      ],
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      },
      
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: words.subtotal,
            styles:{
              halign:'right'
            }
          },
          {
            content: `DZD${paymentData.paymentAmount}`,
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: words.totalTax,
            styles:{
              halign:'right'
            }
          },
          {
            content: 'DZD0',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content:words.totalAmount,
            styles:{
              halign:'right'
            }
          },
          {
            content: `DZD${paymentData.paymentAmount}`,
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: "terms and notes",
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
            +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
            +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: "plain"
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'This is a centered footer',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });
  
    return doc.save("invoice");
  
  }
  export function generateBill(paymentData:any,id:string,titles:any[],words:any) {
    const doc = new jsPDF();
    doc.addFileToVFS(
      "(A) Arslan Wessam A (A) Arslan Wessam A-normal.ttf",
      font
    );
    doc.addFont(
      "(A) Arslan Wessam A (A) Arslan Wessam A-normal.ttf",
      "(A) Arslan Wessam A (A) Arslan Wessam A",
      "normal"
    );
    autoTable(doc, {
      body: [
        [
          {
            content: 'school Erp',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
                
            }
          },
          {
            content: words.invoice,
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: `ReferenceID #${id}`
            +`\nDate: ${format(paymentData.paymentDate, 'dd/MM/yyyy')}`,
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {   
            content: words.billedTo
            +`\n${paymentData.parent}`
            +'\nBilling Address line 1'
            +'\nBilling Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
    
            content: words.shippingAddress
            +`\n${paymentData.parent}`
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {        
            content:words.from
            +'\nSchool erp'
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    const valuesArray:any[] = Object.values(paymentData);
    autoTable(doc, {
      head: [titles],
      body: [
        valuesArray
      ],
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      },
 
      
    });
    autoTable(doc, {
        head: [[
            'Sep 23', 'Oct 23', 'Nov 23', 'Dec 23',
            'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24',
            'May 24', 'Jun 24', 'Jul 24'
          ]],
        body: [
          ["paid","paid","paid"],
        ],
        theme: 'grid',
        headStyles:{
          fillColor: '#E0E0E0',
          textColor:'black'
        },
          didParseCell: function (data) {
           
                data.cell.styles.fontStyle='bold';
                data.cell.styles.textColor='black';
               
            
        }
      });
      autoTable(doc, {

        body: [
          [
            {
              content: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - ',
              styles: {
                halign: 'center',
                fontSize: 20,
                textColor: 'black',
                  
              }
            },
          ],
        ],
        theme: 'plain',
        styles: {
         
        }
      });
      autoTable(doc, {

        body: [
          [
            {
              content: 'school Erp',
              styles: {
                halign: 'left',
                fontSize: 20,
                textColor: 'black',
                  
              }
            },
            {
              content: words.invoice,
              styles: {
                halign: 'right',
                fontSize: 20,
                textColor: 'black'
              }
            }
          ],
        ],
        theme: 'plain',
        styles: {
         
        }
      });
    
      autoTable(doc, {
        body: [
          [
            {
              content: `ReferenceID #${id}`
              +`\nDate: ${format(paymentData.paymentDate, 'dd/MM/yyyy')}`,
              styles: {
                halign: 'right'
              }
            }
          ],
        ],
        theme: 'plain'
      });
    
      autoTable(doc, {
        body: [
          [
            {   
              content: words.billedTo
              +`\n${paymentData.parent}`
              +'\nBilling Address line 1'
              +'\nBilling Address line 2'
              +'\nZip code - City'
              +'\nCountry',
              styles: {
                halign: 'left'
              }
            },
            {
      
              content: words.shippingAddress
              +`\n${paymentData.parent}`
              +'\nShipping Address line 1'
              +'\nShipping Address line 2'
              +'\nZip code - City'
              +'\nCountry',
              styles: {
                halign: 'left'
              }
            },
            {        
              content:words.from
              +'\nSchool erp'
              +'\nShipping Address line 1'
              +'\nShipping Address line 2'
              +'\nZip code - City'
              +'\nCountry',
              styles: {
                halign: 'right'
              }
            }
          ],
        ],
        theme: 'plain'
      });

      autoTable(doc, {
        head: [titles],
        body: [
          valuesArray
        ],
        theme: 'striped',
        headStyles:{
          fillColor: '#343a40'
        },
   
        
      });
      autoTable(doc, {
          head: [[
              'Sep 23', 'Oct 23', 'Nov 23', 'Dec 23',
              'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24',
              'May 24', 'Jun 24', 'Jul 24'
            ]],
          body: [
            ["paid","paid","paid"],
          ],
          theme: 'grid',
          headStyles:{
            fillColor: '#E0E0E0',
            textColor:'black'
          },
            didParseCell: function (data) {
             
                  data.cell.styles.fontStyle='bold';
                  data.cell.styles.textColor='black';
                 
              
          }
        });
    return doc.save("invoice");
}
var font = 'JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTk4NTgKPj4Kc3RyZWFtCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAgRwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjIgMC40IDEuIHJnCjAuNzggRwowLiB3CjAuMiAwLjQgMS4gcmcKNDAuIDgwMS44ODk5OTk5OTk5OTk5ODY0IDMwMi41MjI5ODY0MjUzMzkzNTQ0IC0zMi45OTk5OTk5OTk5OTk5OTI5IHJlCmYKQlQKL0YxIDIwIFRmCjIzLiBUTAoxLiBnCjQ1LiA3NzkuODg5OTk5OTk5OTk5OTg2NCBUZAooc2Nob29sIEVycCkgVGoKRVQKMC4yIDAuNCAxLiByZwowLjc4IEcKMC4gdwowLjIgMC40IDEuIHJnCjM0Mi41MjI5ODY0MjUzMzkzNTQ0IDgwMS44ODk5OTk5OTk5OTk5ODY0IDIxMi43NTcwMTM1NzQ2NjA2MTg0IC0zMi45OTk5OTk5OTk5OTk5OTI5IHJlCmYKQlQKL0YxIDIwIFRmCjIzLiBUTAoxLiBnCjQ4Ny4yODAwMDAwMDAwMDAwMjk2IDc3OS44ODk5OTk5OTk5OTk5ODY0IFRkCihJbnZvaWNlKSBUagpFVAowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuNzggRwowLiB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjc4IEcKMC4gdwowLjIgMC40IDEuIHJnCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNDMxLjU3OTk5OTk5OTk5OTg3MDQgNzM1LjM4OTk5OTk5OTk5OTk4NjQgVGQKKFJlZmVyZW5jZUlEICNxd2R3cWRxd2QpIFRqCkVUCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNDc0LjA3OTk5OTk5OTk5OTkyNzIgNzIzLjg4OTk5OTk5OTk5OTk4NjQgVGQKKERhdGU6IDA1LzA1LzIwMjQpIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuNzggRwowLiB3CjAuMiAwLjQgMS4gcmcKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo0NS4gNjgyLjM4OTk5OTk5OTk5OTk4NjQgVGQKKEJpbGxlZCB0bzopIFRqClQqICh3YWxpZCBtYW5zZXVyKSBUagpUKiAoQmlsbGluZyBBZGRyZXNzIGxpbmUgMSkgVGoKVCogKEJpbGxpbmcgQWRkcmVzcyBsaW5lIDIpIFRqClQqIChaaXAgY29kZSAtIENpdHkpIFRqClQqIChDb3VudHJ5KSBUagpFVAowLjc4IEcKMC4gdwowLjIgMC40IDEuIHJnCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKMjA0LjE4MzMyMjIzOTAzMTcyNDYgNjgyLjM4OTk5OTk5OTk5OTk4NjQgVGQKKFNoaXBwaW5nIGFkZHJlc3M6KSBUagpUKiAod2FsaWQgbWFuc2V1cikgVGoKVCogKFNoaXBwaW5nIEFkZHJlc3MgbGluZSAxKSBUagpUKiAoU2hpcHBpbmcgQWRkcmVzcyBsaW5lIDIpIFRqClQqIChaaXAgY29kZSAtIENpdHkpIFRqClQqIChDb3VudHJ5KSBUagpFVAowLjc4IEcKMC4gdwowLjIgMC40IDEuIHJnCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNTI0LjI3OTk5OTk5OTk5OTg1OSA2ODIuMzg5OTk5OTk5OTk5OTg2NCBUZAooRnJvbTopIFRqCkVUCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNTAyLjg3OTk5OTk5OTk5OTg4MTggNjcwLjg4OTk5OTk5OTk5OTk4NjQgVGQKKFNjaG9vbCBlcnApIFRqCkVUCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNDQ2LjA3OTk5OTk5OTk5OTgxMzYgNjU5LjM4OTk5OTk5OTk5OTk4NjQgVGQKKFNoaXBwaW5nIEFkZHJlc3MgbGluZSAxKSBUagpFVApCVAovRjEgMTAgVGYKMTEuNSBUTAowLjA3OCBnCjQ0Ni4wNzk5OTk5OTk5OTk4MTM2IDY0Ny44ODk5OTk5OTk5OTk5ODY0IFRkCihTaGlwcGluZyBBZGRyZXNzIGxpbmUgMikgVGoKRVQKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo0ODYuMDc5OTk5OTk5OTk5ODEzNiA2MzYuMzkwMDAwMDAwMDAwMSBUZAooWmlwIGNvZGUgLSBDaXR5KSBUagpFVApCVAovRjEgMTAgVGYKMTEuNSBUTAowLjA3OCBnCjUxNS40Nzk5OTk5OTk5OTk3OTA4IDYyNC44OTAwMDAwMDAwMDAxIFRkCihDb3VudHJ5KSBUagpFVAowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuNzggRwowLiB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjQwLiA1OTYuODg5OTk5OTk5OTk5OTg2NCA3Ny42NjEyNDgyNjYyOTY3OTQ5IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMS4gZwo0NS4gNTgzLjM4OTk5OTk5OTk5OTg3MjcgVGQKKFN0dWRlbnQpIFRqCkVUCjAuMiAwLjIzIDAuMjUgcmcKMC43OCBHCjAuIHcKMC4yIDAuMjMgMC4yNSByZwoxMTcuNjYxMjQ4MjY2Mjk2Nzk0OSA1OTYuODg5OTk5OTk5OTk5OTg2NCA4NC42ODg4NzY1NjAzMzI4ODY0IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMS4gZwoxMjIuNjYxMjQ4MjY2Mjk2NzgwNyA1ODMuMzg5OTk5OTk5OTk5ODcyNyBUZAooTGV2ZWwpIFRqCkVUCjAuMiAwLjIzIDAuMjUgcmcKMC43OCBHCjAuIHcKMC4yIDAuMjMgMC4yNSByZwoyMDIuMzUwMTI0ODI2NjI5NjY3IDU5Ni44ODk5OTk5OTk5OTk5ODY0IDg4LjE0MzEzNDUzNTM2NzUyMjYgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjIwNy4zNTAxMjQ4MjY2Mjk2NjcgNTgzLjM4OTk5OTk5OTk5OTg3MjcgVGQKKFBhcmVudCkgVGoKRVQKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjI5MC40OTMyNTkzNjE5OTcxNjEyIDU5Ni44ODk5OTk5OTk5OTk5ODY0IDU2LjgxNjU4ODA3MjEyMjAzNzUgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjI5NS40OTMyNTkzNjE5OTcxNjEyIDU4My4zODk5OTk5OTk5OTk4NzI3IFRkCihBbW91bnQpIFRqCkVUCjAuMiAwLjIzIDAuMjUgcmcKMC43OCBHCjAuIHcKMC4yIDAuMjMgMC4yNSByZwozNDcuMzA5ODQ3NDM0MTE5MjA1OSA1OTYuODg5OTk5OTk5OTk5OTg2NCA5MC4xNjgwNDQzODI4MDE2Mzk0IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMS4gZwozNTIuMzA5ODQ3NDM0MTE5MjA1OSA1ODMuMzg5OTk5OTk5OTk5ODcyNyBUZAooUGF5bWVudCBEYXRlKSBUagpFVAowLjIgMC4yMyAwLjI1IHJnCjAuNzggRwowLiB3CjAuMiAwLjIzIDAuMjUgcmcKNDM3LjQ3Nzg5MTgxNjkyMDgxNjggNTk2Ljg4OTk5OTk5OTk5OTk4NjQgNDguMDAyMjc0NjE4NTg1Mjg5NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKNDQyLjQ3Nzg5MTgxNjkyMDgxNjggNTgzLjM4OTk5OTk5OTk5OTg3MjcgVGQKKFN0YXR1cykgVGoKRVQKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjQ4NS40ODAxNjY0MzU1MDYxMzQ4IDU5Ni44ODk5OTk5OTk5OTk5ODY0IDY5Ljc5OTgzMzU2NDQ5Mzc1MjYgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjQ5MC40ODAxNjY0MzU1MDYxMzQ4IDU4My4zODk5OTk5OTk5OTk4NzI3IFRkCihGcm9tIFdobykgVGoKRVQKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjk2IGcKMC43OCBHCjAuIHcKMC45NiBnCjQwLiA1NzUuMzg5OTk5OTk5OTk5OTg2NCA3Ny42NjEyNDgyNjYyOTY3OTQ5IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwo0NS4gNTYxLjg4OTk5OTk5OTk5OTg3MjcgVGQKKHdzcWUgZXF3ZXEpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4gdwowLjk2IGcKMTE3LjY2MTI0ODI2NjI5Njc5NDkgNTc1LjM4OTk5OTk5OTk5OTk4NjQgODQuNjg4ODc2NTYwMzMyODg2NCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMzE0IGcKMTIyLjY2MTI0ODI2NjI5Njc4MDcgNTYxLjg4OTk5OTk5OTk5OTg3MjcgVGQKKP7w/t/+7f73/o0AIP6U/uj+tP7f/o0pIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4gdwowLjk2IGcKMjAyLjM1MDEyNDgyNjYyOTY2NyA1NzUuMzg5OTk5OTk5OTk5OTg2NCA4OC4xNDMxMzQ1MzUzNjc1MjI2IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwoyMDcuMzUwMTI0ODI2NjI5NjY3IDU2MS44ODk5OTk5OTk5OTk4NzI3IFRkCih3YWxpZCBtYW5zZXVyKSBUagpFVAowLjk2IGcKMC43OCBHCjAuIHcKMC45NiBnCjI5MC40OTMyNTkzNjE5OTcxNjEyIDU3NS4zODk5OTk5OTk5OTk5ODY0IDU2LjgxNjU4ODA3MjEyMjAzNzUgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjI5NS40OTMyNTkzNjE5OTcxNjEyIDU2MS44ODk5OTk5OTk5OTk4NzI3IFRkCigxNTAwMCkgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjAuOTYgZwozNDcuMzA5ODQ3NDM0MTE5MjA1OSA1NzUuMzg5OTk5OTk5OTk5OTg2NCA5MC4xNjgwNDQzODI4MDE2Mzk0IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwozNTIuMzA5ODQ3NDM0MTE5MjA1OSA1NjEuODg5OTk5OTk5OTk5ODcyNyBUZAooMDUvMDUvMjAyNCkgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjAuOTYgZwo0MzcuNDc3ODkxODE2OTIwODE2OCA1NzUuMzg5OTk5OTk5OTk5OTg2NCA0OC4wMDIyNzQ2MTg1ODUyODk1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwo0NDIuNDc3ODkxODE2OTIwODE2OCA1NjEuODg5OTk5OTk5OTk5ODcyNyBUZAooUGFpZCkgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjAuOTYgZwo0ODUuNDgwMTY2NDM1NTA2MTM0OCA1NzUuMzg5OTk5OTk5OTk5OTg2NCA2OS43OTk4MzM1NjQ0OTM3NTI2IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwo0OTAuNDgwMTY2NDM1NTA2MTM0OCA1NjEuODg5OTk5OTk5OTk5ODcyNyBUZAooYmFiYWgpIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjQwLiA1MzMuODg5OTk5OTk5OTk5ODcyNyA0Ny41OTU2ODk0NjU1ODE2ODUzIC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwo0NS4gNTIwLjM4OTk5OTk5OTk5OTg3MjcgVGQKKFNlcCAyMykgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwo4Ny41OTU2ODk0NjU1ODE2NzExIDUzMy44ODk5OTk5OTk5OTk4NzI3IDQ1Ljc4MjUyMDM0MzA4MzM0MTIgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjkyLjU5NTY4OTQ2NTU4MTY3MTEgNTIwLjM4OTk5OTk5OTk5OTg3MjcgVGQKKE9jdCAyMykgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwoxMzMuMzc4MjA5ODA4NjY1MDE5NCA1MzMuODg5OTk5OTk5OTk5ODcyNyA0OC4yNzU2Mjc4ODY1MTg1NjM1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwoxMzguMzc4MjA5ODA4NjY1MDE5NCA1MjAuMzg5OTk5OTk5OTk5ODcyNyBUZAooTm92IDIzKSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjE4MS42NTM4Mzc2OTUxODM1Njg3IDUzMy44ODk5OTk5OTk5OTk4NzI3IDQ3LjU5NTY4OTQ2NTU4MTY5MjQgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjE4Ni42NTM4Mzc2OTUxODM1Njg3IDUyMC4zODk5OTk5OTk5OTk4NzI3IFRkCihEZWMgMjMpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKMjI5LjI0OTUyNzE2MDc2NTI2ODMgNTMzLjg4OTk5OTk5OTk5OTg3MjcgNDYuMzQ5MTM1NjkzODY0MDcwNiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMjM0LjI0OTUyNzE2MDc2NTI2ODMgNTIwLjM4OTk5OTk5OTk5OTg3MjcgVGQKKEphbiAyNCkgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwoyNzUuNTk4NjYyODU0NjI5MzY3MyA1MzMuODg5OTk5OTk5OTk5ODcyNyA0Ny4wMjkwNzQxMTQ4MDA5NTU5IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwoyODAuNTk4NjYyODU0NjI5MzY3MyA1MjAuMzg5OTk5OTk5OTk5ODcyNyBUZAooRmViIDI0KSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjMyMi42Mjc3MzY5Njk0MzAzMTYxIDUzMy44ODk5OTk5OTk5OTk4NzI3IDQ3LjAyOTA3NDExNDgwMDk1NTkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjMyNy42Mjc3MzY5Njk0MzAzMTYxIDUyMC4zODk5OTk5OTk5OTk4NzI3IFRkCihNYXIgMjQpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKMzY5LjY1NjgxMTA4NDIzMTI2NDkgNTMzLjg4OTk5OTk5OTk5OTg3MjcgNDYuNDYyNDU4NzY0MDIwMjI2NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMzc0LjY1NjgxMTA4NDIzMTI2NDkgNTIwLjM4OTk5OTk5OTk5OTg3MjcgVGQKKEFwciAyNCkgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwo0MTYuMTE5MjY5ODQ4MjUxNTE5OCA1MzMuODg5OTk5OTk5OTk5ODcyNyA0OC44NDIyNDMyMzcyOTkzMDAxIC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwo0MjEuMTE5MjY5ODQ4MjUxNTE5OCA1MjAuMzg5OTk5OTk5OTk5ODcyNyBUZAooTWF5IDI0KSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjQ2NC45NjE1MTMwODU1NTA4NDgyIDUzMy44ODk5OTk5OTk5OTk4NzI3IDQ3LjAyOTA3NDExNDgwMDk1NTkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjQ2OS45NjE1MTMwODU1NTA4NDgyIDUyMC4zODk5OTk5OTk5OTk4NzI3IFRkCihKdW4gMjQpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKNTExLjk5MDU4NzIwMDM1MTc0MDIgNTMzLjg4OTk5OTk5OTk5OTg3MjcgNDMuMjg5NDEyNzk5NjQ4MTE4OCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNTE2Ljk5MDU4NzIwMDM1MTc5NyA1MjAuMzg5OTk5OTk5OTk5ODcyNyBUZAooSnVsIDI0KSBUagpFVAowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNDAuIDUxMi4zODk5OTk5OTk5OTk4NzI3IDQ3LjU5NTY4OTQ2NTU4MTY4NTMgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjQ1LiA0OTguODg5OTk5OTk5OTk5OTI5NSBUZAooICkgVGoKRVQKMS4gZwowLjc4IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwo4Ny41OTU2ODk0NjU1ODE2NzExIDUxMi4zODk5OTk5OTk5OTk4NzI3IDQ1Ljc4MjUyMDM0MzA4MzM0MTIgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjkyLjU5NTY4OTQ2NTU4MTY3MTEgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMTMzLjM3ODIwOTgwODY2NTAxOTQgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDguMjc1NjI3ODg2NTE4NTYzNSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMTM4LjM3ODIwOTgwODY2NTAxOTQgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMTgxLjY1MzgzNzY5NTE4MzU2ODcgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDcuNTk1Njg5NDY1NTgxNjkyNCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMTg2LjY1MzgzNzY5NTE4MzU2ODcgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMjI5LjI0OTUyNzE2MDc2NTI2ODMgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDYuMzQ5MTM1NjkzODY0MDcwNiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMjM0LjI0OTUyNzE2MDc2NTI2ODMgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMjc1LjU5ODY2Mjg1NDYyOTM2NzMgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDcuMDI5MDc0MTE0ODAwOTU1OSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMjgwLjU5ODY2Mjg1NDYyOTM2NzMgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMzIyLjYyNzczNjk2OTQzMDMxNjEgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDcuMDI5MDc0MTE0ODAwOTU1OSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMzI3LjYyNzczNjk2OTQzMDMxNjEgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMzY5LjY1NjgxMTA4NDIzMTI2NDkgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDYuNDYyNDU4NzY0MDIwMjI2NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMzc0LjY1NjgxMTA4NDIzMTI2NDkgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNDE2LjExOTI2OTg0ODI1MTUxOTggNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDguODQyMjQzMjM3Mjk5MzAwMSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNDIxLjExOTI2OTg0ODI1MTUxOTggNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKFBhaWQpIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNDY0Ljk2MTUxMzA4NTU1MDg0ODIgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDcuMDI5MDc0MTE0ODAwOTU1OSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNDY5Ljk2MTUxMzA4NTU1MDg0ODIgNDk4Ljg4OTk5OTk5OTk5OTkyOTUgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNTExLjk5MDU4NzIwMDM1MTc0MDIgNTEyLjM4OTk5OTk5OTk5OTg3MjcgNDMuMjg5NDEyNzk5NjQ4MTE4OCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNTE2Ljk5MDU4NzIwMDM1MTc5NyA0OTguODg5OTk5OTk5OTk5OTI5NSBUZAooICkgVGoKRVQKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjc4IEcKMC4gdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMS4gZwpCVAovRjEgMjAgVGYKMjMuIFRMCjAuIGcKODAuODQwMDAwMDAwMDAwMDc0NSA0NDguODg5OTk5OTk5OTk5OTI5NSBUZAooLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0pIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuNzggRwowLiB3CjEuIGcKQlQKL0YxIDIwIFRmCjIzLiBUTAowLiBnCjQ1LiAzOTUuODg5OTk5OTk5OTk5OTg2NCBUZAooc2Nob29sIEVycCkgVGoKRVQKMC43OCBHCjAuIHcKMS4gZwpCVAovRjEgMjAgVGYKMjMuIFRMCjAuIGcKNDg3LjI4MDAwMDAwMDAwMDAyOTYgMzk1Ljg4OTk5OTk5OTk5OTk4NjQgVGQKKEludm9pY2UpIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuNzggRwowLiB3CjEuIGcKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo0MzEuNTc5OTk5OTk5OTk5ODcwNCAzNTEuMzkwMDAwMDAwMDAwMSBUZAooUmVmZXJlbmNlSUQgI3F3ZHdxZHF3ZCkgVGoKRVQKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo0NzQuMDc5OTk5OTk5OTk5OTI3MiAzMzkuODkwMDAwMDAwMDAwMSBUZAooRGF0ZTogMDUvMDUvMjAyNCkgVGoKRVQKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjc4IEcKMC4gdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMS4gZwpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjA3OCBnCjQ1LiAyOTguMzkwMDAwMDAwMDAwMjEzNyBUZAooQmlsbGVkIHRvOikgVGoKVCogKHdhbGlkIG1hbnNldXIpIFRqClQqIChCaWxsaW5nIEFkZHJlc3MgbGluZSAxKSBUagpUKiAoQmlsbGluZyBBZGRyZXNzIGxpbmUgMikgVGoKVCogKFppcCBjb2RlIC0gQ2l0eSkgVGoKVCogKENvdW50cnkpIFRqCkVUCjAuNzggRwowLiB3CjEuIGcKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwoyMDQuMTgzMzIyMjM5MDMxNzI0NiAyOTguMzkwMDAwMDAwMDAwMjEzNyBUZAooU2hpcHBpbmcgYWRkcmVzczopIFRqClQqICh3YWxpZCBtYW5zZXVyKSBUagpUKiAoU2hpcHBpbmcgQWRkcmVzcyBsaW5lIDEpIFRqClQqIChTaGlwcGluZyBBZGRyZXNzIGxpbmUgMikgVGoKVCogKFppcCBjb2RlIC0gQ2l0eSkgVGoKVCogKENvdW50cnkpIFRqCkVUCjAuNzggRwowLiB3CjEuIGcKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo1MjQuMjc5OTk5OTk5OTk5ODU5IDI5OC4zOTAwMDAwMDAwMDAyMTM3IFRkCihGcm9tOikgVGoKRVQKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo1MDIuODc5OTk5OTk5OTk5ODgxOCAyODYuODkwMDAwMDAwMDAwMjEzNyBUZAooU2Nob29sIGVycCkgVGoKRVQKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4wNzggZwo0NDYuMDc5OTk5OTk5OTk5ODEzNiAyNzUuMzkwMDAwMDAwMDAwMjEzNyBUZAooU2hpcHBpbmcgQWRkcmVzcyBsaW5lIDEpIFRqCkVUCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNDQ2LjA3OTk5OTk5OTk5OTgxMzYgMjYzLjg5MDAwMDAwMDAwMDIxMzcgVGQKKFNoaXBwaW5nIEFkZHJlc3MgbGluZSAyKSBUagpFVApCVAovRjEgMTAgVGYKMTEuNSBUTAowLjA3OCBnCjQ4Ni4wNzk5OTk5OTk5OTk4MTM2IDI1Mi4zOTAwMDAwMDAwMDAyMTM3IFRkCihaaXAgY29kZSAtIENpdHkpIFRqCkVUCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMDc4IGcKNTE1LjQ3OTk5OTk5OTk5OTc5MDggMjQwLjg5MDAwMDAwMDAwMDIxMzcgVGQKKENvdW50cnkpIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC43OCBHCjAuIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjIgMC4yMyAwLjI1IHJnCjAuNzggRwowLiB3CjAuMiAwLjIzIDAuMjUgcmcKNDAuIDIxMi44OTAwMDAwMDAwMDAxODUzIDc3LjY2MTI0ODI2NjI5Njc5NDkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjQ1LiAxOTkuMzkwMDAwMDAwMDAwMjEzNyBUZAooU3R1ZGVudCkgVGoKRVQKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjExNy42NjEyNDgyNjYyOTY3OTQ5IDIxMi44OTAwMDAwMDAwMDAxODUzIDg0LjY4ODg3NjU2MDMzMjg4NjQgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjEyMi42NjEyNDgyNjYyOTY3ODA3IDE5OS4zOTAwMDAwMDAwMDAyMTM3IFRkCihMZXZlbCkgVGoKRVQKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjIwMi4zNTAxMjQ4MjY2Mjk2NjcgMjEyLjg5MDAwMDAwMDAwMDE4NTMgODguMTQzMTM0NTM1MzY3NTIyNiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMjA3LjM1MDEyNDgyNjYyOTY2NyAxOTkuMzkwMDAwMDAwMDAwMjEzNyBUZAooUGFyZW50KSBUagpFVAowLjIgMC4yMyAwLjI1IHJnCjAuNzggRwowLiB3CjAuMiAwLjIzIDAuMjUgcmcKMjkwLjQ5MzI1OTM2MTk5NzE2MTIgMjEyLjg5MDAwMDAwMDAwMDE4NTMgNTYuODE2NTg4MDcyMTIyMDM3NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMjk1LjQ5MzI1OTM2MTk5NzE2MTIgMTk5LjM5MDAwMDAwMDAwMDIxMzcgVGQKKEFtb3VudCkgVGoKRVQKMC4yIDAuMjMgMC4yNSByZwowLjc4IEcKMC4gdwowLjIgMC4yMyAwLjI1IHJnCjM0Ny4zMDk4NDc0MzQxMTkyMDU5IDIxMi44OTAwMDAwMDAwMDAxODUzIDkwLjE2ODA0NDM4MjgwMTYzOTQgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjM1Mi4zMDk4NDc0MzQxMTkyMDU5IDE5OS4zOTAwMDAwMDAwMDAyMTM3IFRkCihQYXltZW50IERhdGUpIFRqCkVUCjAuMiAwLjIzIDAuMjUgcmcKMC43OCBHCjAuIHcKMC4yIDAuMjMgMC4yNSByZwo0MzcuNDc3ODkxODE2OTIwODE2OCAyMTIuODkwMDAwMDAwMDAwMTg1MyA0OC4wMDIyNzQ2MTg1ODUyODk1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMS4gZwo0NDIuNDc3ODkxODE2OTIwODE2OCAxOTkuMzkwMDAwMDAwMDAwMjEzNyBUZAooU3RhdHVzKSBUagpFVAowLjIgMC4yMyAwLjI1IHJnCjAuNzggRwowLiB3CjAuMiAwLjIzIDAuMjUgcmcKNDg1LjQ4MDE2NjQzNTUwNjEzNDggMjEyLjg5MDAwMDAwMDAwMDE4NTMgNjkuNzk5ODMzNTY0NDkzNzUyNiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKNDkwLjQ4MDE2NjQzNTUwNjEzNDggMTk5LjM5MDAwMDAwMDAwMDIxMzcgVGQKKEZyb20gV2hvKSBUagpFVAowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuOTYgZwowLjc4IEcKMC4gdwowLjk2IGcKNDAuIDE5MS4zOTAwMDAwMDAwMDAyMTM3IDc3LjY2MTI0ODI2NjI5Njc5NDkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjQ1LiAxNzcuODkwMDAwMDAwMDAwMjEzNyBUZAood3NxZSBlcXdlcSkgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjAuOTYgZwoxMTcuNjYxMjQ4MjY2Mjk2Nzk0OSAxOTEuMzkwMDAwMDAwMDAwMjEzNyA4NC42ODg4NzY1NjAzMzI4ODY0IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwoxMjIuNjYxMjQ4MjY2Mjk2NzgwNyAxNzcuODkwMDAwMDAwMDAwMjEzNyBUZAoo/vD+3/7t/vf+jQAg/pT+6P60/t/+jSkgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjAuOTYgZwoyMDIuMzUwMTI0ODI2NjI5NjY3IDE5MS4zOTAwMDAwMDAwMDAyMTM3IDg4LjE0MzEzNDUzNTM2NzUyMjYgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjIwNy4zNTAxMjQ4MjY2Mjk2NjcgMTc3Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKHdhbGlkIG1hbnNldXIpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4gdwowLjk2IGcKMjkwLjQ5MzI1OTM2MTk5NzE2MTIgMTkxLjM5MDAwMDAwMDAwMDIxMzcgNTYuODE2NTg4MDcyMTIyMDM3NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMzE0IGcKMjk1LjQ5MzI1OTM2MTk5NzE2MTIgMTc3Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKDE1MDAwKSBUagpFVAowLjk2IGcKMC43OCBHCjAuIHcKMC45NiBnCjM0Ny4zMDk4NDc0MzQxMTkyMDU5IDE5MS4zOTAwMDAwMDAwMDAyMTM3IDkwLjE2ODA0NDM4MjgwMTYzOTQgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjM1Mi4zMDk4NDc0MzQxMTkyMDU5IDE3Ny44OTAwMDAwMDAwMDAyMTM3IFRkCigwNS8wNS8yMDI0KSBUagpFVAowLjk2IGcKMC43OCBHCjAuIHcKMC45NiBnCjQzNy40Nzc4OTE4MTY5MjA4MTY4IDE5MS4zOTAwMDAwMDAwMDAyMTM3IDQ4LjAwMjI3NDYxODU4NTI4OTUgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjQ0Mi40Nzc4OTE4MTY5MjA4MTY4IDE3Ny44OTAwMDAwMDAwMDAyMTM3IFRkCihQYWlkKSBUagpFVAowLjk2IGcKMC43OCBHCjAuIHcKMC45NiBnCjQ4NS40ODAxNjY0MzU1MDYxMzQ4IDE5MS4zOTAwMDAwMDAwMDAyMTM3IDY5Ljc5OTgzMzU2NDQ5Mzc1MjYgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjQ5MC40ODAxNjY0MzU1MDYxMzQ4IDE3Ny44OTAwMDAwMDAwMDAyMTM3IFRkCihiYWJhaCkgVGoKRVQKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjc4IEcKMC4gdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKNDAuIDE0OS44OTAwMDAwMDAwMDAyNzA2IDQ3LjU5NTY4OTQ2NTU4MTY4NTMgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjQ1LiAxMzYuMzkwMDAwMDAwMDAwMzI3NCBUZAooU2VwIDIzKSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjg3LjU5NTY4OTQ2NTU4MTY3MTEgMTQ5Ljg5MDAwMDAwMDAwMDI3MDYgNDUuNzgyNTIwMzQzMDgzMzQxMiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKOTIuNTk1Njg5NDY1NTgxNjcxMSAxMzYuMzkwMDAwMDAwMDAwMzI3NCBUZAooT2N0IDIzKSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjEzMy4zNzgyMDk4MDg2NjUwMTk0IDE0OS44OTAwMDAwMDAwMDAyNzA2IDQ4LjI3NTYyNzg4NjUxODU2MzUgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjEzOC4zNzgyMDk4MDg2NjUwMTk0IDEzNi4zOTAwMDAwMDAwMDAzMjc0IFRkCihOb3YgMjMpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKMTgxLjY1MzgzNzY5NTE4MzU2ODcgMTQ5Ljg5MDAwMDAwMDAwMDI3MDYgNDcuNTk1Njg5NDY1NTgxNjkyNCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMTg2LjY1MzgzNzY5NTE4MzU2ODcgMTM2LjM5MDAwMDAwMDAwMDMyNzQgVGQKKERlYyAyMykgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwoyMjkuMjQ5NTI3MTYwNzY1MjY4MyAxNDkuODkwMDAwMDAwMDAwMjcwNiA0Ni4zNDkxMzU2OTM4NjQwNzA2IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwoyMzQuMjQ5NTI3MTYwNzY1MjY4MyAxMzYuMzkwMDAwMDAwMDAwMzI3NCBUZAooSmFuIDI0KSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjI3NS41OTg2NjI4NTQ2MjkzNjczIDE0OS44OTAwMDAwMDAwMDAyNzA2IDQ3LjAyOTA3NDExNDgwMDk1NTkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjI4MC41OTg2NjI4NTQ2MjkzNjczIDEzNi4zOTAwMDAwMDAwMDAzMjc0IFRkCihGZWIgMjQpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKMzIyLjYyNzczNjk2OTQzMDMxNjEgMTQ5Ljg5MDAwMDAwMDAwMDI3MDYgNDcuMDI5MDc0MTE0ODAwOTU1OSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMzI3LjYyNzczNjk2OTQzMDMxNjEgMTM2LjM5MDAwMDAwMDAwMDMyNzQgVGQKKE1hciAyNCkgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwozNjkuNjU2ODExMDg0MjMxMjY0OSAxNDkuODkwMDAwMDAwMDAwMjcwNiA0Ni40NjI0NTg3NjQwMjAyMjY1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwozNzQuNjU2ODExMDg0MjMxMjY0OSAxMzYuMzkwMDAwMDAwMDAwMzI3NCBUZAooQXByIDI0KSBUagpFVAowLjg4IGcKMC43OCBHCjAuIHcKMC44OCBnCjQxNi4xMTkyNjk4NDgyNTE1MTk4IDE0OS44OTAwMDAwMDAwMDAyNzA2IDQ4Ljg0MjI0MzIzNzI5OTMwMDEgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjQyMS4xMTkyNjk4NDgyNTE1MTk4IDEzNi4zOTAwMDAwMDAwMDAzMjc0IFRkCihNYXkgMjQpIFRqCkVUCjAuODggZwowLjc4IEcKMC4gdwowLjg4IGcKNDY0Ljk2MTUxMzA4NTU1MDg0ODIgMTQ5Ljg5MDAwMDAwMDAwMDI3MDYgNDcuMDI5MDc0MTE0ODAwOTU1OSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNDY5Ljk2MTUxMzA4NTU1MDg0ODIgMTM2LjM5MDAwMDAwMDAwMDMyNzQgVGQKKEp1biAyNCkgVGoKRVQKMC44OCBnCjAuNzggRwowLiB3CjAuODggZwo1MTEuOTkwNTg3MjAwMzUxNzQwMiAxNDkuODkwMDAwMDAwMDAwMjcwNiA0My4yODk0MTI3OTk2NDgxMTg4IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwo1MTYuOTkwNTg3MjAwMzUxNzk3IDEzNi4zOTAwMDAwMDAwMDAzMjc0IFRkCihKdWwgMjQpIFRqCkVUCjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKMS4gZwowLjc4IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwo0MC4gMTI4LjM5MDAwMDAwMDAwMDI5OSA0Ny41OTU2ODk0NjU1ODE2ODUzIC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCkIKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwo0NS4gMTE0Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKODcuNTk1Njg5NDY1NTgxNjcxMSAxMjguMzkwMDAwMDAwMDAwMjk5IDQ1Ljc4MjUyMDM0MzA4MzM0MTIgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjkyLjU5NTY4OTQ2NTU4MTY3MTEgMTE0Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMTMzLjM3ODIwOTgwODY2NTAxOTQgMTI4LjM5MDAwMDAwMDAwMDI5OSA0OC4yNzU2Mjc4ODY1MTg1NjM1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCkIKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwoxMzguMzc4MjA5ODA4NjY1MDE5NCAxMTQuODkwMDAwMDAwMDAwMjEzNyBUZAooICkgVGoKRVQKMS4gZwowLjc4IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwoxODEuNjUzODM3Njk1MTgzNTY4NyAxMjguMzkwMDAwMDAwMDAwMjk5IDQ3LjU5NTY4OTQ2NTU4MTY5MjQgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjE4Ni42NTM4Mzc2OTUxODM1Njg3IDExNC44OTAwMDAwMDAwMDAyMTM3IFRkCiggKSBUagpFVAoxLiBnCjAuNzggRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjIyOS4yNDk1MjcxNjA3NjUyNjgzIDEyOC4zOTAwMDAwMDAwMDAyOTkgNDYuMzQ5MTM1NjkzODY0MDcwNiAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMjM0LjI0OTUyNzE2MDc2NTI2ODMgMTE0Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKMjc1LjU5ODY2Mjg1NDYyOTM2NzMgMTI4LjM5MDAwMDAwMDAwMDI5OSA0Ny4wMjkwNzQxMTQ4MDA5NTU5IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCkIKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwoyODAuNTk4NjYyODU0NjI5MzY3MyAxMTQuODkwMDAwMDAwMDAwMjEzNyBUZAooICkgVGoKRVQKMS4gZwowLjc4IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwozMjIuNjI3NzM2OTY5NDMwMzE2MSAxMjguMzkwMDAwMDAwMDAwMjk5IDQ3LjAyOTA3NDExNDgwMDk1NTkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjMyNy42Mjc3MzY5Njk0MzAzMTYxIDExNC44OTAwMDAwMDAwMDAyMTM3IFRkCiggKSBUagpFVAoxLiBnCjAuNzggRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjM2OS42NTY4MTEwODQyMzEyNjQ5IDEyOC4zOTAwMDAwMDAwMDAyOTkgNDYuNDYyNDU4NzY0MDIwMjI2NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKMzc0LjY1NjgxMTA4NDIzMTI2NDkgMTE0Ljg5MDAwMDAwMDAwMDIxMzcgVGQKKCApIFRqCkVUCjEuIGcKMC43OCBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNDE2LjExOTI2OTg0ODI1MTUxOTggMTI4LjM5MDAwMDAwMDAwMDI5OSA0OC44NDIyNDMyMzcyOTkzMDAxIC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCkIKQlQKL0YyIDEwIFRmCjExLjUgVEwKMC4gZwo0MjEuMTE5MjY5ODQ4MjUxNTE5OCAxMTQuODkwMDAwMDAwMDAwMjEzNyBUZAooUGFpZCkgVGoKRVQKMS4gZwowLjc4IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwo0NjQuOTYxNTEzMDg1NTUwODQ4MiAxMjguMzkwMDAwMDAwMDAwMjk5IDQ3LjAyOTA3NDExNDgwMDk1NTkgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKQgpCVAovRjIgMTAgVGYKMTEuNSBUTAowLiBnCjQ2OS45NjE1MTMwODU1NTA4NDgyIDExNC44OTAwMDAwMDAwMDAyMTM3IFRkCiggKSBUagpFVAoxLiBnCjAuNzggRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjUxMS45OTA1ODcyMDAzNTE3NDAyIDEyOC4zOTAwMDAwMDAwMDAyOTkgNDMuMjg5NDEyNzk5NjQ4MTE4OCAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpCCkJUCi9GMiAxMCBUZgoxMS41IFRMCjAuIGcKNTE2Ljk5MDU4NzIwMDM1MTc5NyAxMTQuODkwMDAwMDAwMDAwMjEzNyBUZAooICkgVGoKRVQKMC4gRwowLjU2NzAwMDAwMDAwMDAwMDEgdwowLjc4IEcKMC4gdwowLiBHCjAuNTY3MDAwMDAwMDAwMDAwMSB3CjAuIEcKMC41NjcwMDAwMDAwMDAwMDAxIHcKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvU3ltYm9sCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgovRjE0IDE4IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAyLjUuMSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDUxMjAxMjYxOCswMycwMCcpCj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMjAwNjMgMDAwMDAgbiAKMDAwMDAyMTg4MCAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxNTIgMDAwMDAgbiAKMDAwMDAyMDEyMCAwMDAwMCBuIAowMDAwMDIwMjQ1IDAwMDAwIG4gCjAwMDAwMjAzNzUgMDAwMDAgbiAKMDAwMDAyMDUwOCAwMDAwMCBuIAowMDAwMDIwNjQ1IDAwMDAwIG4gCjAwMDAwMjA3NjggMDAwMDAgbiAKMDAwMDAyMDg5NyAwMDAwMCBuIAowMDAwMDIxMDI5IDAwMDAwIG4gCjAwMDAwMjExNjUgMDAwMDAgbiAKMDAwMDAyMTI5MyAwMDAwMCBuIAowMDAwMDIxNDIwIDAwMDAwIG4gCjAwMDAwMjE1NDkgMDAwMDAgbiAKMDAwMDAyMTY4MiAwMDAwMCBuIAowMDAwMDIxNzg0IDAwMDAwIG4gCjAwMDAwMjIxMjggMDAwMDAgbiAKMDAwMDAyMjIxNCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIxCi9Sb290IDIwIDAgUgovSW5mbyAxOSAwIFIKL0lEIFsgPDBGMTQyNkEwQTQwRjBDRjlERjU0RTQyQTRFOUJBNjlBPiA8MEYxNDI2QTBBNDBGMENGOURGNTRFNDJBNEU5QkE2OUE+IF0KPj4Kc3RhcnR4cmVmCjIyMzE4CiUlRU9G';