import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { DocumentIcon } from "@heroicons/react/outline";
import styled from "@emotion/styled";

import styles from "./index.module.css";

export const devLinks = [
  {
    title: "Technical Overview",
    href: "./docs/v2/technical/overview",
    text: "Take a high-level look at Bunni's architecture",
    icon: DocumentIcon,
  },
  {
    title: "Liquidity Density Functions",
    href: "./docs/v2/technical/ldf/overview",
    text: "Learn about how to build/query liquidity density functions",
    icon: DocumentIcon,
  },
  {
    title: "Deployment Addresses",
    href: "./docs/v2/technical/deployments",
    text: "Find the addresses of Bunni's smart contracts",
    icon: DocumentIcon,
  },
];

export const Guides = [
  {
    title: "What is Bunni?",
    text: "Read a general overview of Bunni v2",
    to: "./docs/v2/overview",
  },
  {
    title: "Providing Liquidity",
    text: "Learn about how to provide liquidity on Bunni v2",
    to: "./docs/v2/guides/creating-a-pool/initialization",
  },
  {
    title: "Example Scenarios",
    text: "Explore example token pair scenarios and how to design strategies for them",
    to: "./docs/v2/concepts/examples",
  },
];

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  /* flex: 1 1 0px; */
  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`;

const StyledGithubIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Documentation of Bunni">
      <HomepageHeader />
      <main>
        <TwoRow
          style={{
            gap: "56px",
            marginTop: "4rem",
          }}
        >
          <div>
            <h2>Getting Started</h2>
            <p>Learn about the powerful features Bunni has to offer and how to use Bunni.</p>
            <div>
              {Guides.map((action) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={action.title}
                  to={action.to}
                >
                  <Card key={action.title} style={{ marginBottom: "1rem" }}>
                    <LinkRow>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            marginBottom: "0rem",
                          }}
                        >
                          {action.title}
                        </h3>
                      </div>
                      <svg
                        style={{
                          width: "24px",
                          opacity: 0.2,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                    <p style={{ marginBottom: "0rem" }}>{action.text}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Developer Links</h2>
            <p>
              Learn more about Bunni's technical details and how to interact
              with Bunni smart contracts.
            </p>
            {devLinks.map((action) => {
              return (
                <Link style={{ textDecoration: "none" }} href={action.href}>
                  <Card key={action.title} style={{ marginBottom: "1rem" }}>
                    <LinkRow>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            marginBottom: "0rem",
                          }}
                        >
                          {action.title}
                        </h3>
                      </div>
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          opacity: 0.2,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                    <p style={{ marginBottom: "0rem" }}>{action.text}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </TwoRow>
      </main>
    </Layout>
  );
}
