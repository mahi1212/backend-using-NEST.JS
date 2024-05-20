import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    constructor(private readonly userService: UsersService) { }

    @Get() // GET /users or /user?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'USER') {
        return this.userService.findAll(role)
    }

    // @Get('interns') // GET // users/interns
    // findALLInterns() {
    //     return []
    // }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Patch(':id') // PATHC /user/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }

}
