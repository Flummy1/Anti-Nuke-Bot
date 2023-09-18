import { Schema } from "mongoose"

export interface IlimiterProfile {
    userId: string,
    savedRoles: string[],
    inQuarantine: Boolean,
    warnCount: number
}

const limiterProfileSchema = new Schema<IlimiterProfile>({
    userId: { type: String, required: true, unique: true },
    savedRoles: { type: [String], default: [] },
    inQuarantine: { type: Boolean, default: false },
    warnCount: { type: Number, default: 0 }
})

export default limiterProfileSchema