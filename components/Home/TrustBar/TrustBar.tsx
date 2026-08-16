"use client";

import { useState, useEffect } from "react";
import styles from "./TrustBar.module.css";

interface TrustBarData {
    isEnabled: boolean;
    leftText: string;
    partners: {
        id: string;
        name: string;
        logo?: string;
    }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function TrustBar() {
    const [trustBarData, setTrustBarData] = useState<TrustBarData | null>(null);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH TRUST BAR DATA
    // ============================================================
    useEffect(() => {
        const fetchTrustBar = async () => {
            try {
                const response = await fetch(`${API_URL}/trust-bar`);
                const result = await response.json();

                if (result.success && result.data) {
                    setTrustBarData(result.data);
                }
            } catch (error) {
                console.error("Error fetching trust bar data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrustBar();
    }, []);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className={styles.trustBar}>
                <div className={styles.container}>
                    <div className={styles.trustBarInner}>
                        <span className={styles.trustBarText}>Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================
    // USE DEFAULT DATA IF NO API DATA
    // ============================================================
    const data = trustBarData || {
        isEnabled: true,
        leftText: "Technology Ecosystem",
        partners: [
            { id: "1", name: "Microsoft Azure" },
            { id: "2", name: "AWS" },
            { id: "3", name: "Google Cloud" },
            { id: "4", name: "OpenAI" },
            { id: "5", name: "SAP" },
            { id: "6", name: "Salesforce" },
        ],
    };

    // ============================================================
    // DON'T RENDER IF DISABLED
    // ============================================================
    if (!data.isEnabled) {
        return null;
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className={styles.trustBar}>
            <div className={styles.container}>
                <div className={styles.trustBarInner}>
                    <span className={styles.trustBarText}>{data.leftText}</span>
                    <div className={styles.partnerLogos}>
                        {data.partners.map((partner) => (
                            <span key={partner.id} className={styles.partnerLogo}>
                                {partner.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}