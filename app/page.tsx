import Link from "next/link";

export default function Home() {
    return (
        <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Web Technologies</h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Next.js Overview Project</p>

            <nav style={{ marginTop: '30px' }}>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
                    <li>
                        <Link href="/about" style={{ color: 'white', backgroundColor: '#0070f3', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/dishes" style={{ color: 'white', backgroundColor: '#28a745', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
                            View Dishes
                        </Link>
                    </li>
                    <li>
                        <Link href="/contacts" style={{ color: 'white', backgroundColor: '#f0ad4e', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
                            Contacts
                        </Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
}