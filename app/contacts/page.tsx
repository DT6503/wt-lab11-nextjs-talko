export default function Contacts() {
    return (
        <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#333' }}>Contacts</h1>
            <p style={{ fontSize: '1.1rem' }}>
                If you have any questions or suggestions, please contact us:
            </p>

            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <p><strong>Address:</strong> Minsk, Independence Ave, 10</p>
                <p><strong>Phone:</strong> +375 (29) 123-45-67</p>
                <p><strong>Email:</strong> support@fooddelivery.by</p>
            </div>

            <p style={{ marginTop: '20px' }}>
                We work every day from 10:00 to 22:00.
            </p>
        </main>
    );
}