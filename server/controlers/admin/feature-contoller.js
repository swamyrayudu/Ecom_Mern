const features = require('../../models/features');

const addfeatureImage = async (req, res) => {
    try {
        const { image } = req.body;
        const featureimage = new features({ image });
        await featureimage.save();
        res.json({
            success: true,
            message: 'Feature Image Added Successfully',
            data : featureimage
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error',
        })
    }
}

const getfeatureImage = async (req, res) => {
    try {
       const images = await features.find();
        res.json({
            success: true,
            message: 'Feature Image Added Successfully',
            data : images
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error',
        })
    }
}

const deleteFeatureImage = async (req, res) => {
    try {
        const { id } = req.params;
        await features.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Feature Image Deleted Successfully',
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error',
        });
    }
};

module.exports = { addfeatureImage, getfeatureImage, deleteFeatureImage };
