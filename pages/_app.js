import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Landot</p>
        <div className="mt-4 content-center">
          <div></div>
          <div>
            {" "}
            <Link href="/">
              <a className="mr-4 text-blue-500" style={{ fontSize: "22px" }}>
                Home
              </a>
            </Link>
            <Link href="/create-item">
              <a className="mr-4 text-blue-500" style={{ fontSize: "22px" }}>
                Mint Land
              </a>
            </Link>
            <Link href="/admin">
              <a className="mr-4 text-blue-500" style={{ fontSize: "22px" }}>
                Dashboard
              </a>
            </Link>
          </div>
          <div></div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
