import chalk from "chalk";
import axios from "axios";
import formatRocket from "../../utils/formatRocket";

export const getOneRocket = async (url: string, format?: boolean) => {
    try {
        // call spaceX endpoint to get rocket information and format rocket if required
        const response = await axios.get(url);
        const rocket = format ? formatRocket(response?.data) : response?.data;

        return rocket;
    } catch (err) {
        console.log(
            chalk`{dim ${new Date()
                .toTimeString()
                .substring(0, 8)}} {magenta http} {red ERROR} ${err}.`
        );
        throw new Error('SpaceX: rocket not found');
    }
}
