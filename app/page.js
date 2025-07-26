'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <style>{`
        html, body, #__next {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #111;
          overflow-x: hidden;
          background: none;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* Hide scrollbar on WebKit browsers */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Outer wrapper with background image */}
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Full-screen translucent white container */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '60px 80px',
            borderRadius: 0, // No rounded corners since it covers full page
            boxShadow: 'none', // Remove shadow for full-page effect
            width: '100%',
            height: '100%',
            textAlign: 'center',
            color: '#111',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            scrollbarWidth: 'none',      // Firefox
            msOverflowStyle: 'none',     // IE 10+
          }}
          className="hide-scrollbar"
        >
          <div>
<h1
  style={{
    fontSize: '3.2rem',
    fontWeight: '800',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: '1.5px',
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '20px 0',
    border: '4px solid black',       // Solid black border
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    borderRadius: '12px',            // Rounded corners
    zIndex: 10,
  }}
>
  Admin Dashboard for Employee Records
</h1>
            <p
              style={{
                fontSize: '1.4rem',
                color: '#444',
                marginBottom: 48,
                lineHeight: 1.6,
                maxWidth: '100%',
                wordWrap: 'break-word',
              }}
            >
              Streamline employee management with a smart platform designed for admins and users — real-time updates, powerful tools, and easy access.
            </p>

            <button
              onClick={() => router.push('/login')}
              style={{
                backgroundColor: '#000dff',
                color: '#fff',
                border: 'none',
                padding: '18px 64px',
                fontSize: '1.3rem',
                fontWeight: '700',
                borderRadius: 50,
                cursor: 'pointer',
                boxShadow: '0 6px 15px rgba(0, 13, 255, 0.4)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                userSelect: 'none',
                marginBottom: 48,
                maxWidth: '100%',
                overflowWrap: 'break-word',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4c5bff';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(76, 91, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000dff';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 13, 255, 0.4)';
              }}
              aria-label="Go to login page"
            >
              Get Started
            </button>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: 40,
              flexWrap: 'wrap',
              marginBottom: 48,
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Feature title="Admin Controls" desc="Easily add, edit & remove employees." />
            <Feature title="Smart Search" desc="Quickly find employees with filters." />
            <Feature title="Real-Time Sync" desc="Instant updates across all devices." />
            
          </div>

          {/* Testimonial */}
          <blockquote
            style={{
              fontStyle: 'italic',
              color: '#555',
              borderLeft: '4px solid #000dff',
              paddingLeft: 20,
              marginBottom: 48,
              fontSize: '1.15rem',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
              overflowWrap: 'break-word',
            }}
          >
          &quot;"The Admin Dashboard for Employee Records has completely streamlined how we handle employee data — efficient, intuitive, and secure. A must-have tool for any organization!" 
          </blockquote>
        </div>
      </div>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div
      style={{
        flex: '1 1 150px',
        backgroundColor: '#f0f4ff',
        borderRadius: 14,
        padding: 24,
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '100%',
        overflowWrap: 'break-word',
      }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#000000ff', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}
