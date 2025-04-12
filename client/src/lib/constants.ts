export const TOKEN_LAUNCH_DATE = new Date("2028-10-25T00:00:00");

export const PRESALE_END_DATE = new Date(
  Date.now() + 65 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 55 * 60 * 1000 + 20 * 1000
);

export const PRESALE_ROUNDS = [
  {
    id: 1,
    name: "1st Round",
    price: 0.05,
    supply: 1000000,
    sold: 1000000, // 100%
    progress: 100
  },
  {
    id: 2,
    name: "2nd Round",
    price: 0.06,
    supply: 1000000,
    sold: 1000000, // 100%
    progress: 100
  },
  {
    id: 3,
    name: "3rd Round",
    price: 0.07,
    supply: 1000000,
    sold: 750000, // 75%
    progress: 75
  },
  {
    id: 4,
    name: "4th Round",
    price: 0.08,
    supply: 1000000,
    sold: 250000, // 25%
    progress: 25
  },
  {
    id: 5,
    name: "5th Round",
    price: 0.09,
    supply: 1000000,
    sold: 0, // 0%
    progress: 0
  }
];

export const CURRENT_PRICE = 0.50;
export const TOTAL_SUPPLY = 10000000;
export const CURRENT_SOLD_PERCENTAGE = 50; // 50%

export const STAKING_PERIODS = [
  {
    id: 1,
    months: 12,
    rate: 6, // 6%
  },
  {
    id: 2,
    months: 24,
    rate: 8, // 8%
  },
  {
    id: 3,
    months: 36,
    rate: 10, // 10%
  },
];

export const MATRIX_LEVELS = [
  { level: "1st Level", percentage: 20 },
  { level: "2nd Level", percentage: 15 },
  { level: "3rd Level", percentage: 10 },
  { level: "4th Level", percentage: 5 },
  { level: "5th Level", percentage: 3 },
  { level: "6th to 10th Level", percentage: 2 },
  { level: "11th to 15th Level", percentage: 1 },
  { level: "16th to 20th Level", percentage: 0.5 },
];

export const RANK_REWARDS = [
  {
    rank: "VIP-1",
    directBusiness: 100,
    teamBusiness: 500,
    reward: 50
  },
  {
    rank: "VIP-2",
    directBusiness: 200,
    teamBusiness: 1000,
    reward: 100
  },
  {
    rank: "VIP-3",
    directBusiness: 300,
    teamBusiness: 10000,
    reward: 1000
  },
  {
    rank: "VIP-4",
    directBusiness: 400,
    teamBusiness: 100000,
    reward: 10000
  },
  {
    rank: "VIP-5",
    directBusiness: 500,
    teamBusiness: 1000000,
    reward: 100000
  }
];

export const FEATURES = [
  {
    icon: "shield-alt",
    title: "Secure Blockchain",
    description: "Built on Binance Smart Chain (BSC) for security, speed, and low transaction fees."
  },
  {
    icon: "wallet",
    title: "Multi-Wallet Support",
    description: "Connect with popular wallets like MetaMask, Trust Wallet, and more for seamless transactions."
  },
  {
    icon: "chart-line",
    title: "Growth Potential",
    description: "Strategic token release schedule and limited supply to maintain value and growth over time."
  },
  {
    icon: "hand-holding-usd",
    title: "Rewarding Structure",
    description: "Multi-level referral system with competitive commission rates and bonus rewards."
  },
  {
    icon: "code",
    title: "Smart Contracts",
    description: "Audited and verified smart contracts for token sales, staking, and rewards distribution."
  },
  {
    icon: "exchange-alt",
    title: "Token Exchange",
    description: "Users can exchange tokens with each other directly on the platform with minimal fees."
  }
];
