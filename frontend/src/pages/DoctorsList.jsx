import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import DoctorCard from '../components/doctor/DoctorCard'
import { getDoctors } from '../services/doctorService'
import { filters } from '../utils/mockData'

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  useEffect(() => {
    getDoctors()
      .then(({ data }) => setDoctors(data.doctors || []))
      .catch(() => setDoctors([]))
  }, [])

  const filteredDoctors = useMemo(() => {
    if (selectedDepartment === 'All') return doctors
    return doctors.filter((doctor) => doctor.specialty === selectedDepartment)
  }, [doctors, selectedDepartment])

  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <section className="page-header">
          <span className="eyebrow">Specialists</span>
          <h1>Find the right doctor for your care</h1>
        </section>

        <div className="filter-group" aria-label="Doctor specialties">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === selectedDepartment ? 'filter-button active' : 'filter-button'}
              onClick={() => setSelectedDepartment(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="doctor-grid list-grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
