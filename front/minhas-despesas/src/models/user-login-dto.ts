import { UserDto } from "./user-dto";

export interface UserLoginDto {
    user?: UserDto;
    token?: string | undefined;
}