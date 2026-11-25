import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Office.css'

const API_URL = 'http://localhost:5050/api/offices'

function Office() {
    const [officeName, setOfficeName] = useState("")
    const [officeNumber, setOfficeNumber] = useState("")
    const [offices, setOffices] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function loadOffices() {
        setLoading(true)
        setError("")

        try {
            const response = await axios.get(API_URL)
            setOffices(response.data)
        } catch (requestError) {
            setError("Unable to load offices. Please make sure the server is running.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOffices()
    }, [])

    async function saveOffice(event) {
        event.preventDefault()

        if (!officeName.trim()) {
            alert("Please enter office name.")
            return
        }

        if (!officeNumber.trim()) {
            alert("Please enter office number.")
            return
        }

        try {
            const response = await axios.post(`${API_URL}/save`, {
                roomNumber: officeNumber.trim(),
                location: officeName.trim()
            })

            if (response.status === 200 || response.status === 201) {
                alert("Office saved successfully!")
                setOfficeName("")
                setOfficeNumber("")
                await loadOffices()
            }
        } catch (requestError) {
            alert(requestError.response?.data?.message || "Failed to save office.")
        }
    }

    async function deleteOffice(office) {
        const confirmed = window.confirm(
            `Delete office ${office.roomNumber || ""}${office.location ? ` (${office.location})` : ""}?`
        )
        if (!confirmed) return

        try {
            await axios.delete(`${API_URL}/${office.id}`)
            setOffices(currentOffices =>
                currentOffices.filter(currentOffice => currentOffice.id !== office.id)
            )
        } catch (requestError) {
            const status = requestError.response?.status
            if (status === 404) {
                alert("Office not found.")
            } else if (status === 409) {
                alert(requestError.response?.data?.message || "The office is assigned to a doctor and cannot be deleted.")
            } else {
                alert(requestError.response?.data?.message || "Failed to delete office.")
            }
        }
    }

    function updateOffice() {
        alert("Update functionality will be implemented separately.")
    }

    const normalizedSearch = searchTerm.trim().toLowerCase()
    const filteredOffices = offices.filter(office => {
        const name = (office.location || "").toLowerCase()
        const number = (office.roomNumber || "").toLowerCase()
        return name.includes(normalizedSearch) || number.includes(normalizedSearch)
    })

    return (
        <main className="office-page">
            <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/office">Office</a></li>
          </ul>
        </nav>
            <section className="office-header">
                <div>
                    <p className="office-eyebrow">Clinic Administration</p>
                    <h1>Available Offices</h1>
                    <p className="office-subtitle">View, search, and manage clinic office records.</p>
                </div>

                <form className="office-save-form" onSubmit={saveOffice}>
                    <div className="office-form-field">
                        <label htmlFor="office-name">Office name</label>
                        <input
                            id="office-name"
                            type="text"
                            placeholder="e.g. Main Building"
                            value={officeName}
                            onChange={event => setOfficeName(event.target.value)}
                        />
                    </div>

                    <div className="office-form-field">
                        <label htmlFor="office-number">Office number</label>
                        <input
                            id="office-number"
                            type="text"
                            placeholder="e.g. A101"
                            value={officeNumber}
                            onChange={event => setOfficeNumber(event.target.value)}
                        />
                    </div>

                    <button className="office-save-button" type="submit">Add Office</button>
                </form>
            </section>

            <section className="office-card" aria-labelledby="office-list-heading">
                <div className="office-toolbar">
                    <div>
                        <h2 id="office-list-heading">Office Directory</h2>
                        <p>{filteredOffices.length} {filteredOffices.length === 1 ? "office" : "offices"}</p>
                    </div>

                    <label className="office-search" htmlFor="office-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            id="office-search"
                            type="search"
                            placeholder="Search name or number"
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                        />
                    </label>
                </div>

                {loading ? (
                    <div className="office-message">Loading offices...</div>
                ) : error ? (
                    <div className="office-message office-error">
                        <p>{error}</p>
                        <button type="button" onClick={loadOffices}>Try again</button>
                    </div>
                ) : (
                    <div className="office-table-wrap">
                        <table className="office-table">
                            <thead>
                                <tr>
                                    <th>Office Name</th>
                                    <th>Office Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOffices.map(office => (
                                    <tr key={office.id}>
                                        <td>
                                            <span className="office-name">{office.location || "—"}</span>
                                        </td>
                                        <td>
                                            <span className="office-number">{office.roomNumber || "—"}</span>
                                        </td>
                                        <td>
                                            <div className="office-actions">
                                                <button
                                                    className="office-update-button"
                                                    type="button"
                                                    onClick={() => updateOffice(office)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="office-delete-button"
                                                    type="button"
                                                    onClick={() => deleteOffice(office)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOffices.length === 0 && (
                                    <tr>
                                        <td className="office-empty" colSpan="3">
                                            {searchTerm ? "No offices match your search." : "No offices available."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Office
