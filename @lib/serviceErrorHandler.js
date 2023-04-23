const errorHandler = (res, err) => {
   return res.status(err?.status || 500).json({ message: err?.message || 'Server side error!' });
 };
 
 module.exports = (fn) => async (req, res, next) => {
   try {
     await fn(req, res, next);
   } catch (err) {
     errorHandler(res, err);
   }
 };