import { IInvoice, LoggedUser } from "./helpers/interfaces";

declare global {
    namespace Express {
      interface Request {
        user: LoggedUser,
        invoice: IInvoice,
        itemQtyInc: number
      }
    }
}