const scrolldatela = async () => {
    await driver.action('pointer')
        .move({ duration: 0, x: 500, y: 1500 }) // Ponto inicial (embaixo)
        .down({ button: 0 })
        .move({ duration: 1000, x: 500, y: 500 }) // Arrastou para cima
        .up({ button: 0 })
        .perform();
}

describe('Fluxo de compra - Swag Labs', () => {

    it('Realizar o Login', async () => {
        // Verificar se estou na tela de Login
        await expect($('android=new UiSelector().text("LOGIN")')).toBeDisplayed()

        // Realizar o Login
        await $('~test-Username').setValue('standard_user')
        await $('~test-Password').setValue('secret_sauce')

        // Clicar no botão Login
        await $('android=new UiSelector().text("LOGIN")').click()
    })

    it('Verificar se a tela de produtos foi carregada e selecionar um produto', async () => {
        // Verificar se estou na tela de Produtos
        await expect($('android=new UiSelector().text("PRODUCTS")')).toBeDisplayed()

        // Selecionar a mochila
        await $('android=new UiSelector().text("Sauce Labs Backpack")').click()

        // Verificar o produto selecionado
        await expect($('android=new UiSelector().text("BACK TO PRODUCTS")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("Sauce Labs Backpack")')).toBeDisplayed()

        // Adcionar o produto ao carrinho e verificar o icone do carrinho
        await scrolldatela()
        await expect($('~test-Price')).toHaveText("$29.99")
        await $('android=new UiSelector().text("ADD TO CART")').click()
        await expect($('android=new UiSelector().text("1")')).toBeDisplayed()

        // Clicar no carrinho
        await $('android=new UiSelector().text("1")').click()
    })

    it('Verificar o carrinho', async () => {
        // Verificar se estou na tela do carrinho
        await expect($('android=new UiSelector().text("YOUR CART")')).toBeDisplayed()

        //Verifico o produto, quantidade e preço
        await expect($('android=new UiSelector().text("Sauce Labs Backpack")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("$29.99")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("1").instance(1)')).toBeDisplayed()

        // Clicar para avançar no checkout
        await $('android=new UiSelector().text("CHECKOUT")').click()
    })

    it('Proceder com o checkout', async () => {
        // Verificar se estou na tela de checkout
        await expect($('android=new UiSelector().text("CHECKOUT: INFORMATION")')).toBeDisplayed()

        // Preencher as informações do checkout
        await $('~test-First Name').setValue('Angus')
        await $('~test-Last Name').setValue('Young')
        await $('~test-Zip/Postal Code').setValue('00000-000')

        // Clicar para proceder com a compra
        await $('android=new UiSelector().text("CONTINUE")').click()
    })

    it('Verificar as informações finais de compra', async () => {
        // Verificar se estou na tela final de checkout
        await expect($('android=new UiSelector().text("CHECKOUT: OVERVIEW")')).toBeDisplayed()

        // Verificar as informações do produto e pagamento
        await expect($('android=new UiSelector().text("1").instance(1)')).toBeDisplayed()
        await expect($('android=new UiSelector().text("Sauce Labs Backpack")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("SauceCard #31337")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("Total: $32.39")')).toBeDisplayed()        
        
        // Clicar no botão para finalizar a compra
        await scrolldatela()
        await $('~test-FINISH').click()
    })

    it('Verificar se a ordem foi executada', async () => {
        // Verificar se estou na tela de confirmação do pedido
        await expect($('android=new UiSelector().text("CHECKOUT: COMPLETE!")')).toBeDisplayed()
        await expect($('android=new UiSelector().text("THANK YOU FOR YOU ORDER")')).toBeDisplayed()
    })

})
