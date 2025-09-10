import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a user',
    description: 'Registers a new user in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'Data of the newly created user',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);

      return {
        success: true,
        message: 'User Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of users',
    description: 'Fetches all registered users from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users successfully retrieved',
    type: User,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        success: false,
        message: 'Internal server error',
      },
    },
  })
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a specific user',
    description: 'Returns a specific user data',
  })
  @ApiParam({
    name: 'id',
    description: 'User Id',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: User,
  })
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.userService.findOne(+id);
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description: 'Updates an existing user with the provided data',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID to update',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    schema: {
      example: {
        success: true,
        message: 'User Updated Successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
    schema: {
      example: {
        success: false,
        message: 'Invalid data',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        success: false,
        message: 'User not found',
      },
    },
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(+id, updateUserDto);
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Removes a user from the system permanently',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID to delete',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    schema: {
      example: {
        success: true,
        message: 'User Deleted Successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        success: false,
        message: 'User not found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        success: false,
        message: 'Internal server error',
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
