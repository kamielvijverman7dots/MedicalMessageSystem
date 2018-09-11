const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
  `select account_id "id",
      first_name "first_name",
      last_name "last_name",
      email "email",
      address "address",
      password "password",
      account_type "account_type",
      doctor_id "doctor_id"
    from accounts`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.account_id = context.id;

    query += `\nwhere accountId = :account_id`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql =
 `insert into accounts (
    first_name,
    last_name,
    email,
    address,
    account_type,
    doctor_id
  ) values (
    :first_name,
    :last_name,
    :email,
    :address,
    :account_type,
    :doctor_id
  ) returning account_id
  into :account_id`;

async function create(pat) {
  const account = Object.assign({}, pat);

  account.account = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, account);

  account.account_id = result.outBinds.account_id[0];

  return account;
}

module.exports.create = create;