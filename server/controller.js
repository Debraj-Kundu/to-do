const Tasks = require("./model");

const routeController = {
    getList: async (req, res) => {
        try {
          const tasks = await Tasks.find();
          res.json(tasks);
        } catch (err) {
          res.status(500).json({ msg: "wrong input" });
        }
    },
    postList: async (req, res) => {
        try {
            const newTask = await Tasks.create(req.body);
            res.json({ newTask });
        } catch (err) {
            res.status(500).json({ msg: "wrong input" });
        }
        },
    deleteList: async (req, res) => {
        try {
            const { id: myid } = req.params;
            const task = await Tasks.findOneAndDelete({ _id: myid });
            if (!task) return res.status(404).json({ msg: "not found id error" });
            res.json({ task });
        } catch (error) {
            res.status(404).json({ msg: "not found" });
        }
    },
    getItem: async (req, res) => {
        try {
            const { id: myid } = req.params;
            const task = await Tasks.findOne({ _id: myid });
            if (!task) return res.status(404).json({ msg: "not found id error" });
            res.json(task);
        } catch (error) {
            res.status(404).json({ msg: "not found" });
        }
    },
    updateList: async (req, res) => {
        try {
            const { id: myid } = req.params;
            const task = await Tasks.findOneAndUpdate({ _id: myid }, req.body, {
            new: true,
            runValidators: true,
            });
            if (!task) return res.status(404).json({ msg: "not found id error" });
            res.json(task);
        } catch (error) {
            res.status(404).json({ msg: "not found" });
        }
    },
}

module.exports = routeController