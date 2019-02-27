class gitHubData {
    constructor(domSelector) {
        this.selector = domSelector
        this.outputDiv = document.querySelector(this.selector)

        this.url = `https://api.github.com/users/AtarDavid/starred?client_id=16f4616916cfb480da5a&client_secret=a507d7a942f8a60c66917f7773595826ec5b9120`

        // Store my data
        this.data = null

        this.fetchData()
    }

    fetchData() {

        fetch(this.url)
            .then(
                response => response.json()
            )
            .then(
                repos => {
                    this.data = repos
                    this.render()
                }
            )
            .catch(
                err => console.log(`panic: ${err}`)
            )
    }

    render() {
        let output = ` <section class="mx-auto text-center">
        <div class="container p4 pb-4">
            <h2>Projects</h2>
        </div>
    </section>`
        output += `<div class="album py-2">
        <div class="container">
            <div class="row">`
        output += this.template()
        output += `</div></div></div>`
        this.outputDiv.innerHTML = output
    }

    template() {
        const list = this.data.map(item => {
            const { name, description, created_at, updated_at } = item
            console.log(name, description, created_at, updated_at)

            return `
            <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top"
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                    alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;"
                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1679d900077%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1679d900077%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.3515625%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    data-holder-rendered="true">
                <div class="card-body">
                    <h3>${name}</h3>
                    <p class="card-text">${description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Created: ${created_at.slice(0, 10)}</small>
                        <small class="text-muted">Last updated: ${updated_at.slice(0, 10)}</small>
                    </div>
                </div>
            </div>
        </div>
        `
        })

        return list.join("")
    }

}

const userRepos = new gitHubData('#repos')