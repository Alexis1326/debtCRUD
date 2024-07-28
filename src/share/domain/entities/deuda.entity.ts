import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Debt extends Document {

    @Prop({ unique: true, index: true })
    name: string;

    @Prop({ index: true, unique: true })
    namePerson: string;

    @Prop({ index: true })
    payday: Date;

    @Prop({ index: true })
    price: number;
}

export const DebtSchema = SchemaFactory.createForClass(Debt)