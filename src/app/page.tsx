import AuthenticationBody from "../../components/AuthenticationBody";

export default function Home() {
  return (
    <div className="page-container">
      <div className="header">
        <h3>WiiLink</h3>
        <img src="/logo.png" alt="RiiConnect24 Logo" width="150" />
      </div>

      <AuthenticationBody />

      <div className="footer">
        <p>&copy; WiiLink 2022-2024</p>
      </div>
    </div>
  )
}
