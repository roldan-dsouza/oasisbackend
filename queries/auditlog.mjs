import audit_log from "../model/audit_log.mjs";

const auditLogMiddleware = async (data) => {
  try {
    const { reservation_id, action, performed_by } = data;
    const timestamp = new Date();
    
    if (user_id) {
      req.auditLog = async () => {
        const newAuditLog = new audit_log({
          reservation_id,
          action,
          performed_by,
          timestamp: timestamp.toISOString(),
        });
        const result = await newAuditLog.save();
        return { message: "Audit log created successfully", result: result };
      };
    }
  } catch (error) {
    console.error("Error setting up audit log middleware:", error);
    next(error);
  }
};

export default auditLogMiddleware;
