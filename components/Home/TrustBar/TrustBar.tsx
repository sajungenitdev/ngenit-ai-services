"use client";

import styles from "./TrustBar.module.css";

export default function TrustBar() {
    return (
        <div className={styles.trustBar}>
            <div className={styles.container}>
                <div className={styles.trustBarInner}>
                    <span className={styles.trustBarText}>Technology Ecosystem</span>
                    <div className={styles.partnerLogos}>
                        <span className={styles.partnerLogo}>Microsoft Azure</span>
                        <span className={styles.partnerLogo}>AWS</span>
                        <span className={styles.partnerLogo}>Google Cloud</span>
                        <span className={styles.partnerLogo}>OpenAI</span>
                        <span className={styles.partnerLogo}>SAP</span>
                        <span className={styles.partnerLogo}>Salesforce</span>
                    </div>
                </div>
            </div>
        </div>
    );
}