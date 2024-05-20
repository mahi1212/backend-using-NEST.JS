import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Charlie Davis",
            "email": "charlie.davis@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Dana Lee",
            "email": "dana.lee@example.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Evan Brown",
            "email": "evan.brown@example.com",
            "role": "USER"
        }
    ]


    findAll(role?: 'INTERN' | 'ADMIN' | 'USER') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray.length === 0){
                throw new NotFoundException('User role not found') 
            }

            return rolesArray;
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User not found!')

        return user
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }

        this.users.push(newUser)

        return newUser
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }

            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user  => user.id !== id)

        return removeUser
    }

}
