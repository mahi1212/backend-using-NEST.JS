import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["ADMIN", "USER", "INTERN"], {
        message: "Give a valid role"
    })
    role: "ADMIN" | "USER" | "INTERN";
}