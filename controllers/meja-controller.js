const mejaModel = require(`../models/index`).meja
const joi = require(`joi`)
const Meja = require('../models/meja')

const validateMeja = async (input) => {
    let rules = joi.object().keys({
        nomor_meja: joi
            .string()
            .required(),
        status: joi
            .boolean()
            .required()
    })
    let { error } = rules.validate(input)
    if (error) {
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)

        return {
            status: false,
            message: message
        }
    }
    return {
        status: true
    }
}

exports.getMeja = async (request, response) => {
    try {
        let meja = await mejaModel.findAll()
        return response.json({
            status: true,
            data: meja
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.availableMeja = async (request, response) => {
    try {
        let param = { status: "1" }
        let meja = await mejaModel.findAll({ where: param })
        return response.json({
            status: true,
            message: meja
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.addMeja = async (request, response) => {
    try {
        let resultValidation = validateMeja(request.body)
        if (resultValidation.status == false) {
            return response.json({
                status: false,
                message: resultValidation.message
            })
        }
        await mejaModel.create(request.body)
        return response.json({
            status: true,
            message: `Data meja berhasil ditambahkan`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.updateMeja = async (request, response) => {
    try {
        let id_meja = request.params.id_meja
        let resultValidation = validateMeja(request.body)
        if (resultValidation.status == false) {
            return response.json({
                status: false,
                message: resultValidation.message
            })
        }
        await mejaModel.update(request.body, { where: { id: id_meja } })
        return response.json({
            status: true,
            message: `Data meja berhasil diubah`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteMeja = async (request, response) => {
    try {
        let id_meja = request.params.id_meja
        await mejaModel.destroy({ where: { id: id_meja } })
        return response.json({
            status: true,
            message: `Data meja berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}