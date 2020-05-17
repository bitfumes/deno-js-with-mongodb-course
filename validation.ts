export default {
    async validate(ctx:any){
        const { value } = await ctx.request.body();
        if (!value) {
            ctx.response.status = 400; // bad request
            ctx.response.body = { error: "Please provide the required data" };
            return;
        }

        const fields = ['email','password','name'];
        for (let index = 0; index < fields.length; index++) {
            if (!value[fields[index]]) {
                ctx.response.status = 422; // unprocessable entity
                ctx.response.body = {
                    error: { message: `${fields[index]} field is required` },
                };
                return false;
            }
        }


        return value;
    }
}