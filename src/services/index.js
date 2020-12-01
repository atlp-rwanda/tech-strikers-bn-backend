import list from "../database/config/tokenlist";

class listservices {

    static AddToList(data) {
        list.push(data);
        return list;
    }
    static checklist(data) {
        return list.includes(data);
    }
}
export default listservices;