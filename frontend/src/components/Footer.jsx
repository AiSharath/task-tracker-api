import React from "react"
import "./Footer.css"

function Footer(){
    return(
        <>
            <div className="footer-container">
                <table className="footer-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Company</th>
                            <th>Resources</th>
                            <th>Legal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Features</td>
                            <td>About</td>
                            <td>Help Center</td>
                            <td>Privacy</td>
                        </tr>
                        <tr>
                            <td>Pricing</td>
                            <td>Blog</td>
                            <td>API docs</td>
                            <td>Terms</td>
                        </tr>
                        <tr>
                            <td>Updates</td>
                            <td>Contact</td>
                        </tr>
                    </tbody>
                </table>
                <p>&copy;2026 TaskFlow All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer