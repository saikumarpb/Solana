use instruction::IntroInstruction;
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};
pub mod instruction;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = IntroInstruction::unpack(instruction_data)?;
    match instruction {
        IntroInstruction::InitUserInput { name, message } => {
            add_student_intro(program_id, accounts, name, message)
        }
    }
}

pub fn add_student_intro(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    name: String,
    message: String,
) -> ProgramResult {
    msg!("Adding student intro");
    msg!("Name: {}", name);
    msg!("Message: {}", message);
    Ok(())
}
