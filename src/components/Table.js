import React from 'react';

const Table = () => {
    return(
        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
            <th scope="col">Expense</th>
            <th scope="col">Type</th>
            <th scope="col">Balance</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>-20</td>
                <td>Chick-fil-a</td>
                <td>2549.75</td>
            </tr>
            <tr>
                <td>1500.00</td>
                <td>Coporate</td>
                <td>2569.75</td>
            </tr>
            <tr>
                <td>-130.25</td>
                <td>KOHL</td>
                <td>1069.75</td>
            </tr>
            <tr>
                <td>-300.00</td>
                <td>Bed bath & Beyond</td>
                <td>1200</td>
            </tr>
            <tr>
                <td>-154.00</td>
                <td>Amazon</td>
                <td>1046.00</td>
            </tr>
            <tr>
                <td>-16.00</td>
                <td>Chick-fil-a</td>
                <td>1030.00</td>
            </tr>
        </tbody>
        </table>
    )
}

export default Table;