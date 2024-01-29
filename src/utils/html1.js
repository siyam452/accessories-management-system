import { getAllOrdersForAllUsers } from "@/services/order";
import { date } from "joi";

export const printFormat = (data) => {
  let total = 0;
  let tbody = "";
  tbody += `
  <tr>
    <th>Order Number</th>
    <th>Total Price</th>
    <th>Date</th>
    
  </tr>
`;
data.map((item, index) => {
    total += item?.totalPrice;
    tbody += `
      <tr>
        <td>${index + 1}</td> 
        <td>${item?.totalPrice} BDT</td>
        <td>${item.createdAt}
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
      <h1><u>Monthly Sales Report</u></h1>
      
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
          <td><b>Total Sale Amount</b></td>
          <td></b>${total} BDT</b></td>
        </tr>
      </table>
    </div>
  </body>
</html>
    `;
};

export const handlePrint1 = async () => {
  let printWindow = window.open();

  const allOrders = await getAllOrdersForAllUsers();
  let html = printFormat(allOrders?.data);
  printWindow.document.write(`${html}`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(function () {
    printWindow.print();
  }, 100);
};
