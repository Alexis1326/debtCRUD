import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Debt extends Document {

    @Prop({ unique: true, index: true })
    namePerson: string;

    @Prop({ type: [{ payday: Date, price: Number }], default: [] })
    debts: { payday: Date; price: number }[];
}

export const DebtSchema = SchemaFactory.createForClass(Debt)