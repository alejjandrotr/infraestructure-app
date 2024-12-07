import { suma } from './prueba';


describe('Prueba de suma de dos numeros', () => {

  it('Prueba 2 + 2 = 4', () =>{
    let a = 2;
    let b = 2
    const result = suma(a,b);
    expect(result).toEqual(4)
  })

  it('Prueba 2 + 6 = 8', () =>{
    let a = 2;
    let b = 6
    const result = suma(a,b);
    expect(result).toEqual(8)
  })
})