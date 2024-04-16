function Student(){
    return(
        <div>
            <table border={1}>
                <thead>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Course</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Tanbir Yousuf</td>
                        <td>21-44394-1</td>
                        <td>
                            <ul>
                                <li>AWT</li>
                                <li>NS</li>
                                <li>HCI</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Naimul Haque</td>
                        <td>21-44387-1</td>
                        <td>
                            <ul>
                                <li>IDS</li>
                                <li>AWT</li>
                                <li>.NET</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Student