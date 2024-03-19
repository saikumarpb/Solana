import { struct, str, u8 } from '@project-serum/borsh';

export class StudentIntro {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }

    borshInstructionSchema = struct([
        u8('variant'),
        str('name'),
        str('message'),
    ]);

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000);
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
    }
}
