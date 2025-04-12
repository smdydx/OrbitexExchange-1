import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  walletAddress: { type: String },
  referralCode: { type: String, unique: true },
  referredBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  txHash: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const stakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userMetricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  directReferrals: { type: Number, default: 0 },
  totalReferrals: { type: Number, default: 0 },
  directBusiness: { type: String, default: "0" },
  teamBusiness: { type: String, default: "0" },
  currentRank: { type: String, default: "New" },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Purchase = mongoose.model('Purchase', purchaseSchema);
export const Stake = mongoose.model('Stake', stakeSchema);
export const Reward = mongoose.model('Reward', rewardSchema);
export const UserMetrics = mongoose.model('UserMetrics', userMetricsSchema);

export const insertUserSchema = User;
export const insertPurchaseSchema = Purchase;
export const insertStakeSchema = Stake;
export const insertRewardSchema = Reward;
export const insertUserMetricsSchema = UserMetrics;

export type { 
  User as SelectUser,
  User as InsertUser,
  Purchase as SelectPurchase,
  Purchase as InsertPurchase,
  Stake as SelectStake,
  Stake as InsertStake,
  Reward as SelectReward,
  Reward as InsertReward,
  UserMetrics as SelectUserMetrics,
  UserMetrics as InsertUserMetrics
};