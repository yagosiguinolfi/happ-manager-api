import * as userRepo from '../repositories/userRepository.js';

export const getAll = () => userRepo.findAll();
export const getById = (id) => userRepo.findById(id);
export const createUser = (data) => userRepo.create(data);
