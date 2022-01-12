module.exports = async (req, res) => {
    try {

    } catch (err) {
        if (err instanceof ReferenceError) {
          return res.status(400).json({
            err: err.name,
            message: err.message,
          });
        } else {
          throw err;
        }
      }
    };