import UsersDataAPI from "./UsersDataAPI";

class UsersDataServise {
    constructor() {
        this.monthArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        this.usersDataAPI = new UsersDataAPI();
    }

    defineAndGetTheNameAndNubmerOfTheMonth(dob) {
        const date = new Date(dob);
        const monthPart = date.getUTCMonth();
        const monthNumber = monthPart;
        const monthName = this.monthArray[monthNumber];
        return { "monthName": monthName, "monthNumber": monthNumber };
    }

    async getUsersDataWithMonthName() {
        let usersDataArray = await this.usersDataAPI.getUsersList();
        let fullDataArray = usersDataArray.map((oneUserData) => {
            let monthData = this.defineAndGetTheNameAndNubmerOfTheMonth(oneUserData.dob);
            let monthName = monthData.monthName;
            oneUserData.monthName = monthName;
            return oneUserData;
        });
        return fullDataArray;
    }

    async getMonthObjectWithUsersData() {
        let usersData = await this.getUsersDataWithMonthName();
        let objectSortByMonth = {};
        this.monthArray.map(monthName => {
            let dataArr = usersData.filter(oneUserData => oneUserData.monthName === monthName);
            objectSortByMonth[monthName] = dataArr;
        })
        return objectSortByMonth;
    }
}

export default UsersDataServise;
