"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const hash_1 = require("../shared/utils/hash");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findManyWithPagination(paginationOptions) {
        return await this.userModel
            .find()
            .where({ is_active: true })
            .limit(paginationOptions.limit)
            .skip((paginationOptions.page - 1) * paginationOptions.limit);
    }
    async updateUser(id, data) {
        return await this.userModel.findByIdAndUpdate(id, data);
    }
    async updateAddress(id, data) {
        const user = await this.userModel.findById(id);
        const address = user.address;
        if (data.address.hasOwnProperty('_id')) {
            const updatedData = address.map((item) => {
                if (item._id === data.address._id) {
                    return data.address;
                }
                else {
                    return item;
                }
            });
            user.address = updatedData;
        }
        else {
            Object.assign(data, { _id: (0, uuid_1.v4)() });
            user.address = [...user.address, data];
        }
        return user.save();
    }
    async create(data) {
        data.password = (0, hash_1.make)(data.password);
        const newUser = await this.userModel.create(data);
        return newUser;
    }
    async delete(id) {
        await this.userModel.findByIdAndDelete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map