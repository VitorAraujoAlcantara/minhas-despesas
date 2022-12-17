import { RoleDto } from "./role-dto";

export interface UserDto {
    userId?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    roles?: Array<RoleDto> | undefined;
}