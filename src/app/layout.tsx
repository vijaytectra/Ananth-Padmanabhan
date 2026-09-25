import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananth Padmanabhan — Law, Technology, Institutions",
  description: "Ananth Padmanabhan is a legal scholar, institution builder and university leader working across law, technology, public policy and higher education. Founding Vice-Chancellor, Sreenidhi University.",
  openGraph: {
    type: "profile",
    title: "Ananth Padmanabhan — Law, Technology, Institutions",
    description: "Legal scholar, institution builder and university leader. Founding Vice-Chancellor, Sreenidhi University.",
    url: "https://www.example.com/",
    images: [{ url: "https://www.example.com/og-portrait.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.example.com/",
  },
};

export const viewport = {
  themeColor: "#110906",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.example.com/#person",
      "name": "Ananth Padmanabhan",
      "honorificPrefix": "Prof. Dr.",
      "jobTitle": "Founding Vice-Chancellor",
      "worksFor": {
        "@type": "CollegeOrUniversity",
        "name": "Sreenidhi University",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "National Law School of India University" },
        { "@type": "CollegeOrUniversity", "name": "University of Pennsylvania Carey Law School" },
        { "@type": "CollegeOrUniversity", "name": "Stanford Graduate School of Business" }
      ],
      "knowsAbout": [
        "Technology law and policy",
        "Intellectual property",
        "Copyright",
        "Regulation",
        "Public policy",
        "Legal education",
        "Higher education"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/ananthpadmanabhan1",
        "https://www.law.upenn.edu/live/profiles/498-ananth-padmanabhan",
        "https://cprindia.org/people/ananth-padmanabhan/",
        "https://carnegieendowment.org/people/ananth-padmanabhan"
      ]
    },
    {
      "@type": "Book",
      "name": "Intellectual Property Rights: Infringement and Remedies",
      "author": { "@id": "https://www.example.com/#person" },
      "publisher": { "@type": "Organization", "name": "LexisNexis Butterworths Wadhwa" },
      "datePublished": "2012"
    },
    {
      "@type": "Book",
      "name": "India as a Pioneer of Innovation",
      "editor": [
        { "@type": "Person", "name": "Harbir Singh" },
        { "@id": "https://www.example.com/#person" },
        { "@type": "Person", "name": "Ezekiel J. Emanuel" }
      ],
      "publisher": { "@type": "Organization", "name": "Oxford University Press" },
      "isbn": "9780199476084"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="js">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&family=Jost:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
