import { Header } from "../components/header";

export function Bills() {
  return (
    <div className='page-bills'>
      <div className='header'>
        <Header
          title='Bills'
          subheading='A list of bills created for your students'
        />
        <div className='actions'>
          <a role='button' href='/create-bill'>
            <i className='bi bi-plus'></i> Create Bill
          </a>
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Created At </th>
            <th scope='col'>ID Number</th>
            <th scope='col'>Name</th>
            <th scope='col'>Class</th>
            <th scope='col'>Guardian</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>22/01/2025</th>
            <td>CRY-12911133</td>
            <td>Funbi Lawal</td>
            <td>Grade Four</td>
            <td>Mr. Lawal</td>
            <td>#40,000</td>
            <td>Paid</td>
          </tr>
          <tr>
            <th scope='row'>22/01/2025</th>
            <td>CRY-12911133</td>
            <td>Funbi Lawal</td>
            <td>Grade Four</td>
            <td>Mr. Lawal</td>
            <td>#40,000</td>
            <td>Paid</td>
          </tr>
          <tr>
            <th scope='row'>22/01/2025</th>
            <td>CRY-12911133</td>
            <td>Funbi Lawal</td>
            <td>Grade Four</td>
            <td>Mr. Lawal</td>
            <td>#40,000</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
