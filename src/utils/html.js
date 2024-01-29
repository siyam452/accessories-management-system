import { getAllAdminStocks } from "@/services/stock";
export const printFormat = (data) => {
  let total = 0;
  let tbody = "";
  tbody += `
  <tr>
    <th>Item Name</th>
    <th>Stock Count</th>
    <th>Size</th>
  </tr>
`;
  data.map((item) => {
    
    total += item?.stockCount;
    tbody += `
    
        <tr>
        
          <td>${item?.name}</td>
          <td>${item?.stockCount}</td>
          <td>${item?.size}</td>
        </tr>
        <tr>
        <td colspan="3" style="border-bottom: 1px dashed black;"></td>
      </tr>
    `;
  });

  return `
   <html>
  <head></head>
  <body>
    <div
      style="
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <h1><u>Stock Report</u></h1>
      
      <table
        style="
          font-size: 20px;
          width: 50vw;
          text-align: center;
          border-collapse: separate;
          border-spacing: 0 15px;
        "
      >
      ${tbody}
      <tr>
            <td colspan="3" style="border-top: 2px solid black;"></td>
          </tr>
        <tr>
          <td><b>Total Stock</b></td>
          <td></b>${total}</b></td>
        </tr>
      </table>
    </div>
  </body>
</html>
    `;
};

export const handlePrint = async () => {
  let printWindow = window.open();

  const allStocks = await getAllAdminStocks();
  let html = printFormat(allStocks?.data);
  printWindow.document.write(`${html}`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(function () {
    printWindow.print();
  }, 100);
};
