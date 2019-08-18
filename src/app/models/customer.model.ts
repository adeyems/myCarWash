export class CustomerModel {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public phone: string,
        public email: string,
        public password: string,
        private date: Date
    ) {
    }
}

