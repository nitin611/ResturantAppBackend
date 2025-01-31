const Restaurant = require("../Models/resturant");

// ✅ Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, coords } = req.body;

        const newRestaurant = new Restaurant({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            coords
        });

        await newRestaurant.save();

        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant: newRestaurant
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Get restaurant details by ID
exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        return res.status(200).json({ success: true, restaurant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Update restaurant details
exports.updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update only the provided fields
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Delete restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        return res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
